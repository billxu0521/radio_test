<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
    <div class="max-w-4xl mx-auto space-y-6">
      <!-- 標題 -->
      <h1 class="text-3xl font-bold text-center text-gray-800">無線電題庫閃卡</h1>

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
        <!-- 進度條 -->
        <ProgressBar :current="store.progress.current" :total="store.progress.total" />

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
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useFlashCardStore } from '@/stores/flashCardStore'
import { useKeyboard } from '@/composables/useKeyboard'
import FlashCard from '@/components/FlashCard.vue'
import QuestionBankSelector from '@/components/QuestionBankSelector.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import KeyboardHint from '@/components/KeyboardHint.vue'

const store = useFlashCardStore()

// 啟用鍵盤控制
useKeyboard()

onMounted(() => {
  store.loadBankList()
})
</script>
