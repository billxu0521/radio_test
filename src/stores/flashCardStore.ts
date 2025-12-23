import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Question, QuestionBank, QuestionBankInfo } from '@/types'
import { getUrlParams, updateUrlParams } from '@/composables/useUrlParams'

// 題庫檔案映射
const BANK_FILES: Record<string, string> = {
  Inteference: 'Inteference.json',
  Law: 'Law.json',
  Magnetic: 'Magnetic.json',
  Operating: 'Operating.json',
  Safety: 'Safety.json',
  System: 'System.json',
}

// 等級資料夾對照
const CLASS_FOLDERS: Record<string, string> = {
  A: 'classA_test',
  B: 'classB_test',
  C: 'classC_test',
}

// 等級名稱對照
export const CLASS_NAMES: Record<string, string> = {
  A: '一等',
  B: '二等',
  C: '三等',
}

// 全部題庫的特殊 ID
const ALL_BANKS_ID = 'all'

export const useFlashCardStore = defineStore('flashCard', () => {
  // State
  const currentClass = ref<string>('C') // 預設三等
  const banks = ref<QuestionBankInfo[]>([])
  const allBanksData = ref<Map<string, QuestionBank>>(new Map()) // 快取所有題庫資料
  const currentBankId = ref<string | null>(null)
  const currentBank = ref<QuestionBank | null>(null)
  const currentIndex = ref(0)
  const isFlipped = ref(false)
  const isLoading = ref(false)

  // Getters
  const currentQuestion = computed<Question | null>(() => {
    if (!currentBank.value || currentBank.value.questions.length === 0) {
      return null
    }
    return currentBank.value.questions[currentIndex.value]
  })

  const totalQuestions = computed(() => currentBank.value?.questions.length ?? 0)

  const progress = computed(() => ({
    current: currentIndex.value + 1,
    total: totalQuestions.value,
  }))

  // Actions
  async function loadBankList() {
    isLoading.value = true
    const loadedBanks: QuestionBankInfo[] = []
    let totalCount = 0
    const folder = CLASS_FOLDERS[currentClass.value]

    // 清除舊的快取
    allBanksData.value.clear()

    for (const [id, filename] of Object.entries(BANK_FILES)) {
      try {
        const response = await fetch(`/${folder}/${filename}`)
        const data: QuestionBank = await response.json()
        allBanksData.value.set(id, data) // 快取題庫資料
        loadedBanks.push({
          id,
          filename,
          title: data.title,
          count: data.questions.length,
        })
        totalCount += data.questions.length
      } catch (error) {
        console.error(`Failed to load ${filename}:`, error)
      }
    }

    // 在最前面加入「全部」選項
    loadedBanks.unshift({
      id: ALL_BANKS_ID,
      filename: '',
      title: '全部',
      count: totalCount,
    })

    banks.value = loadedBanks
    isLoading.value = false
  }

  async function switchClass(classId: string) {
    if (currentClass.value === classId) return

    currentClass.value = classId
    currentBankId.value = null
    currentBank.value = null
    currentIndex.value = 0
    isFlipped.value = false

    await loadBankList()
  }

  async function selectBank(bankId: string) {
    if (currentBankId.value === bankId) return

    isLoading.value = true

    if (bankId === ALL_BANKS_ID) {
      // 合併所有題庫
      const allQuestions: Question[] = []
      for (const [, bankData] of allBanksData.value) {
        allQuestions.push(...bankData.questions)
      }
      currentBankId.value = bankId
      currentBank.value = {
        title: '全部題庫',
        questions: allQuestions,
      }
      currentIndex.value = 0
      isFlipped.value = false
    } else {
      // 從快取中取得單一題庫
      const data = allBanksData.value.get(bankId)
      if (data) {
        currentBankId.value = bankId
        currentBank.value = data
        currentIndex.value = 0
        isFlipped.value = false
      }
    }

    isLoading.value = false
  }

  function nextQuestion() {
    if (currentIndex.value < totalQuestions.value - 1) {
      currentIndex.value++
      isFlipped.value = false // 切題時自動翻回正面
    }
  }

  function prevQuestion() {
    if (currentIndex.value > 0) {
      currentIndex.value--
      isFlipped.value = false // 切題時自動翻回正面
    }
  }

  function flipCard() {
    isFlipped.value = !isFlipped.value
  }

  function goToQuestion(index: number) {
    if (index >= 0 && index < totalQuestions.value) {
      currentIndex.value = index
      isFlipped.value = false
    }
  }

  // 重置所有選擇（考等、題庫、題號）
  async function reset() {
    currentClass.value = 'C' // 預設三等
    currentBankId.value = null
    currentBank.value = null
    currentIndex.value = 0
    isFlipped.value = false
    await loadBankList()
  }

  // 從 URL 參數初始化狀態
  async function initFromUrl() {
    const params = getUrlParams()

    // 設定考等
    if (params.class && params.class !== currentClass.value) {
      currentClass.value = params.class
    }

    // 載入題庫列表
    await loadBankList()

    // 選擇題庫
    if (params.bank) {
      await selectBank(params.bank)

      // 跳轉到指定題號
      if (params.question && params.question > 0) {
        goToQuestion(params.question - 1)
      }
    }
  }

  // 同步 URL 參數
  function syncUrlParams() {
    const questionNumber = currentBankId.value ? currentIndex.value + 1 : null
    updateUrlParams(currentClass.value, currentBankId.value, questionNumber)
  }

  // 監聽狀態變化，自動更新 URL
  watch([currentClass, currentBankId, currentIndex], () => {
    syncUrlParams()
  })

  return {
    // State
    currentClass,
    banks,
    currentBankId,
    currentBank,
    currentIndex,
    isFlipped,
    isLoading,
    // Getters
    currentQuestion,
    totalQuestions,
    progress,
    // Actions
    loadBankList,
    switchClass,
    selectBank,
    nextQuestion,
    prevQuestion,
    flipCard,
    goToQuestion,
    reset,
    initFromUrl,
  }
})
