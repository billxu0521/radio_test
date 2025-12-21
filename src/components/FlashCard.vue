<template>
  <div
    class="w-full max-w-2xl h-[60vh] min-h-[400px] max-h-[600px] cursor-pointer perspective-1000"
    @click="$emit('flip')"
  >
    <div
      class="flip-card-inner relative w-full h-full"
      :class="{ flipped: isFlipped }"
    >
      <!-- 正面 -->
      <div class="absolute w-full h-full backface-hidden">
        <QuestionCard :question="question" />
      </div>
      <!-- 背面 -->
      <div class="absolute w-full h-full backface-hidden rotate-y-180">
        <AnswerCard :question="question" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import QuestionCard from './QuestionCard.vue'
import AnswerCard from './AnswerCard.vue'
import type { Question } from '@/types'

defineProps<{
  question: Question
  isFlipped: boolean
}>()

defineEmits<{
  flip: []
}>()
</script>
