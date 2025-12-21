<template>
  <!-- 手機版佈局 -->
  <div class="sm:hidden min-h-screen bg-gray-50 flex flex-col">
    <!-- 頂部選擇器 -->
    <MobileHeader @show-info="showInfoModal = true" />

    <!-- 資訊 Modal -->
    <InfoModal :visible="showInfoModal" @close="showInfoModal = false" />

    <!-- 主內容區 -->
    <div class="flex-1 pt-24 pb-20 px-3 overflow-hidden">
      <!-- 載入中 -->
      <div v-if="store.isLoading" class="h-full flex items-center justify-center">
        <div class="text-center">
          <div class="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          <p class="mt-4 text-gray-600">載入中...</p>
        </div>
      </div>

      <!-- 閃卡區域 -->
      <div v-else-if="store.currentQuestion" class="h-full overflow-hidden">
        <Transition :name="slideDirection" mode="out-in">
          <FlashCard
            :key="store.currentIndex"
            :question="store.currentQuestion"
            :is-flipped="store.isFlipped"
            @flip="store.flipCard"
            @prev="handlePrev"
            @next="handleNext"
            class="h-full"
          />
        </Transition>
      </div>

      <!-- 選擇題庫提示 -->
      <div v-else class="h-full flex items-center justify-center text-gray-500">
        請選擇題庫開始練習
      </div>
    </div>

    <!-- 底部工具列 -->
    <MobileToolbar
      v-if="store.currentQuestion"
      :current="store.progress.current"
      :total="store.progress.total"
      :disabled="{ prev: store.currentIndex === 0, next: store.currentIndex >= store.totalQuestions - 1 }"
      @prev="handlePrev"
      @next="handleNext"
      @jump="store.goToQuestion"
    />
  </div>

  <!-- 桌面版佈局 -->
  <div class="hidden sm:block min-h-screen bg-gray-50 text-gray-900 py-6 px-4 sm:py-8">
    <div class="max-w-4xl mx-auto space-y-6">
      <!-- 標題 -->
      <h1 class="text-2xl sm:text-3xl font-bold text-center tracking-tight text-gray-900">
        台灣無線電題庫
        <span class="block sm:inline text-blue-600">記憶卡片</span>
      </h1>
      <p class="text-xs text-gray-500 text-center tracking-wide uppercase">本工具僅供練習使用</p>

      <!-- 等級選擇器 -->
      <ClassSelector />

      <!-- 題庫選擇器 -->
      <QuestionBankSelector
        :banks="store.banks"
        :selected-id="store.currentBankId"
        @select="store.selectBank"
      />

      <!-- 載入中 -->
      <div v-if="store.isLoading" class="text-center py-12">
        <div class="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
        <p class="mt-4 text-gray-600">載入中...</p>
      </div>

      <!-- 閃卡區域 -->
      <template v-else-if="store.currentQuestion">
        <!-- 進度條與跳轉 -->
        <div class="flex flex-col gap-4">
          <ProgressBar :current="store.progress.current" :total="store.progress.total" />

          <div class="flex items-center justify-end gap-2 bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
            <span class="text-sm text-gray-500 pl-2">跳至題號</span>
            <input
              v-model.number="jumpToNumber"
              type="number"
              inputmode="numeric"
              min="1"
              :max="store.totalQuestions"
              placeholder="題號"
              class="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center text-base"
              @keyup.enter="handleJumpDesktop"
            />
            <button
              @click="handleJumpDesktop"
              class="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors cursor-pointer text-sm font-medium"
            >
              GO
            </button>
          </div>
        </div>

        <!-- 閃卡 -->
        <div class="flex justify-center">
          <Transition :name="slideDirection" mode="out-in">
            <FlashCard
              :key="store.currentIndex"
              :question="store.currentQuestion"
              :is-flipped="store.isFlipped"
              @flip="store.flipCard"
              @prev="handlePrev"
              @next="handleNext"
            />
          </Transition>
        </div>

        <!-- 導航按鈕 -->
        <div class="grid grid-cols-2 gap-4">
          <button
            @click="handlePrev"
            :disabled="store.currentIndex === 0"
            class="px-4 py-4 bg-white border border-gray-200 text-gray-700 rounded-xl shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 active:scale-95 transition-all cursor-pointer font-medium flex items-center justify-center gap-2"
          >
            ← 上一題
          </button>
          <button
            @click="handleNext"
            :disabled="store.currentIndex >= store.totalQuestions - 1"
            class="px-4 py-4 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 active:scale-95 transition-all cursor-pointer font-medium flex items-center justify-center gap-2"
          >
            下一題 →
          </button>
        </div>

        <!-- 鍵盤提示 -->
        <KeyboardHint />
      </template>

      <!-- 選擇題庫提示 -->
      <div v-else class="text-center py-12 text-gray-500">請選擇一個題庫開始練習</div>
    </div>

    <!-- Footer -->
    <footer class="mt-12 pb-6 text-center text-sm text-gray-500 space-y-4">
      <div>
        <p>本專案使用 國家通訊傳播委員會 2019 公告題庫</p>
        <p class="mt-1">
          本專案受到 Misawai 專案
          <a
            href="https://github.com/Misawai/TW-HAM-radio-test-questions/"
            target="_blank"
            class="text-indigo-600 hover:underline"
          >
            TW-HAM-radio-test-questions
          </a>
          啟發
        </p>
      </div>
      <div class="max-w-2xl mx-auto text-xs text-gray-400">
        <p class="font-medium text-gray-500">著作權聲明</p>
        <p class="mt-1">本試題庫為公有領域。</p>
        <p class="mt-1">
          本試題庫所收錄之試題，係國家通訊傳播委員會依電信管理法以及業餘無線電人員及電臺管理辦法等法令所舉行之「業餘無線電人員資格測試」使用。依據中華民國著作權法第
          9 條第 1 項第 5
          款規定，「依法令舉行之各類考試試題及其備用試題」不得為著作權之標的。
        </p>
      </div>
      <div class="text-xs text-gray-400 pt-2 border-t border-gray-200">
        <p>
          本專案：
          <a
            href="https://github.com/billxu0521/radio_test"
            target="_blank"
            class="text-indigo-600 hover:underline"
          >
            github.com/billxu0521/radio_test
          </a>
        </p>
        <p class="mt-1">作者：ChihFan</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useFlashCardStore } from '@/stores/flashCardStore'
import { useKeyboard } from '@/composables/useKeyboard'
import FlashCard from '@/components/FlashCard.vue'
import ClassSelector from '@/components/ClassSelector.vue'
import QuestionBankSelector from '@/components/QuestionBankSelector.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import KeyboardHint from '@/components/KeyboardHint.vue'
import MobileHeader from '@/components/MobileHeader.vue'
import MobileToolbar from '@/components/MobileToolbar.vue'
import InfoModal from '@/components/InfoModal.vue'

const store = useFlashCardStore()

// 資訊 Modal 顯示狀態
const showInfoModal = ref(false)

// 滑動方向
const slideDirection = ref<'slide-left' | 'slide-right'>('slide-left')

// 跳轉題號（桌面版）
const jumpToNumber = ref<number | undefined>(undefined)
const handleJumpDesktop = () => {
  if (jumpToNumber.value && jumpToNumber.value >= 1 && jumpToNumber.value <= store.totalQuestions) {
    store.goToQuestion(jumpToNumber.value - 1)
  }
}

// 切換題目（帶動畫方向）
const handlePrev = () => {
  slideDirection.value = 'slide-right'
  store.prevQuestion()
}

const handleNext = () => {
  slideDirection.value = 'slide-left'
  store.nextQuestion()
}

// 啟用鍵盤控制
useKeyboard()

onMounted(() => {
  store.loadBankList()
})
</script>
