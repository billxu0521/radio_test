<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
    <div class="max-w-4xl mx-auto space-y-6">
      <!-- 標題 -->
      <h1 class="text-3xl font-bold text-center text-gray-800">台灣無線電題庫記憶卡片工具</h1>
      <p class="text-xs text-gray-400 text-center ">本工具僅供練習使用</p>
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
        <div
          class="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"
        ></div>
        <p class="mt-4 text-gray-600">載入中...</p>
      </div>

      <!-- 閃卡區域 -->
      <template v-else-if="store.currentQuestion">
        <!-- 進度條與跳轉 -->
        <div class="flex items-center justify-center gap-4">
          <ProgressBar :current="store.progress.current" :total="store.progress.total" />
          <div class="flex items-center gap-2">
            <input
              v-model.number="jumpToNumber"
              type="number"
              min="1"
              :max="store.totalQuestions"
              placeholder="題號"
              class="w-20 px-2 py-1 border border-gray-300 rounded text-center"
              @keyup.enter="handleJump"
            />
            <button
              @click="handleJump"
              class="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors cursor-pointer text-sm"
            >
              跳轉
            </button>
          </div>
        </div>

        <!-- 閃卡 -->
        <div class="flex justify-center">
          <FlashCard
            :question="store.currentQuestion"
            :is-flipped="store.isFlipped"
            @flip="store.flipCard"
          />
        </div>

        <!-- 導航按鈕 -->
        <div class="flex justify-center gap-4">
          <button
            @click="store.prevQuestion"
            :disabled="store.currentIndex === 0"
            class="px-6 py-2 bg-gray-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors cursor-pointer"
          >
            ← 上一題
          </button>
          <button
            @click="store.nextQuestion"
            :disabled="store.currentIndex >= store.totalQuestions - 1"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors cursor-pointer"
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

const store = useFlashCardStore()

// 跳轉題號
const jumpToNumber = ref<number | undefined>(undefined)
const handleJump = () => {
  if (jumpToNumber.value && jumpToNumber.value >= 1 && jumpToNumber.value <= store.totalQuestions) {
    store.goToQuestion(jumpToNumber.value - 1)
  }
}

// 啟用鍵盤控制
useKeyboard()

onMounted(() => {
  store.loadBankList()
})
</script>
