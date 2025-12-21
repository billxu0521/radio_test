<template>
  <div
    class="w-full max-w-2xl cursor-pointer perspective-1000"
    :style="{ minHeight: cardHeight + 'px' }"
    @click="handleClick"
    @touchstart="swipe.onTouchStart"
    @touchend="handleTouchEnd"
  >
    <div
      class="flip-card-inner relative w-full"
      :class="{ flipped: isFlipped }"
      :style="{ height: cardHeight + 'px' }"
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
import { computed } from 'vue'
import QuestionCard from './QuestionCard.vue'
import AnswerCard from './AnswerCard.vue'
import { useSwipe } from '@/composables/useSwipe'
import type { Question } from '@/types'

const props = defineProps<{
  question: Question
  isFlipped: boolean
}>()

const emit = defineEmits<{
  flip: []
  prev: []
  next: []
}>()

// 滑動控制
const swipe = useSwipe(
  () => emit('next'),  // 左滑 = 下一題
  () => emit('prev')   // 右滑 = 上一題
)

// 處理點擊：滑動時不觸發翻轉
const handleClick = () => {
  if (!swipe.isSwiping.value) {
    emit('flip')
  }
}

// 處理觸控結束
const handleTouchEnd = (e: TouchEvent) => {
  swipe.onTouchEnd(e)
}

// 根據題目和選項長度動態計算卡片高度
const cardHeight = computed(() => {
  const questionLength = props.question.question.length
  const answersLength = props.question.answers.reduce((sum, a) => sum + a.length, 0)
  const totalLength = questionLength + answersLength

  // 基本高度 500px，根據文字長度增加
  // 每 100 字增加約 40px
  const baseHeight = 500
  const extraHeight = Math.ceil(totalLength / 100) * 40

  return Math.max(baseHeight, baseHeight + extraHeight)
})
</script>
