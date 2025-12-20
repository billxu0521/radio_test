<template>
  <div class="h-full bg-white rounded-2xl shadow-xl p-6 flex flex-col">
    <!-- 題號 -->
    <div class="text-sm text-gray-500 mb-2">第 {{ question.questionNumber }} 題</div>

    <!-- 題目 -->
    <h2 class="text-xl font-semibold text-gray-800 mb-6 flex-shrink-0">
      {{ question.question }}
    </h2>

    <!-- 選項列表 -->
    <div class="flex-1 space-y-3 overflow-y-auto">
      <div
        v-for="(answer, index) in question.answers"
        :key="index"
        class="p-3 bg-gray-50 rounded-lg border border-gray-200"
      >
        <span class="font-medium text-blue-600 mr-2">{{ getOptionLabel(index) }}.</span>
        <span class="text-gray-700">{{ answer }}</span>
      </div>
    </div>

    <!-- 提示 -->
    <div class="mt-4 text-center text-sm text-gray-400">
      按空白鍵或點擊卡片查看答案
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Question } from '@/types'

defineProps<{
  question: Question
}>()

const getOptionLabel = (index: number): string => {
  return ['A', 'B', 'C', 'D'][index]
}
</script>
