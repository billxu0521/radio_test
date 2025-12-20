<template>
  <div
    class="h-full bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl shadow-xl p-6 flex flex-col"
  >
    <!-- 標題 -->
    <div class="text-lg font-semibold text-green-700 mb-4 text-center">正確答案</div>

    <!-- 答案選項（標示正確） -->
    <div class="flex-1 space-y-3 overflow-y-auto">
      <div
        v-for="(answer, index) in question.answers"
        :key="index"
        class="p-3 rounded-lg border-2 transition-all"
        :class="
          isCorrect(index)
            ? 'bg-green-500 text-white border-green-600 scale-105'
            : 'bg-white/50 text-gray-500 border-transparent'
        "
      >
        <span class="font-medium mr-2">{{ getOptionLabel(index) }}.</span>
        <span>{{ answer }}</span>
        <span v-if="isCorrect(index)" class="ml-2">✓</span>
      </div>
    </div>

    <!-- 提示 -->
    <div class="mt-4 text-center text-sm text-green-600">按 ← → 切換題目</div>
  </div>
</template>

<script setup lang="ts">
import type { Question } from '@/types'

const props = defineProps<{
  question: Question
}>()

const getOptionLabel = (index: number): string => {
  return ['A', 'B', 'C', 'D'][index]
}

// correctAnswer 是 1-4，需轉換為 0-3 索引
const isCorrect = (index: number): boolean => {
  return index === props.question.correctAnswer - 1
}
</script>
