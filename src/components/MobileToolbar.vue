<template>
  <div class="fixed bottom-0 left-0 right-0 z-10 bg-white border-t border-gray-200 px-3 py-2 safe-area-bottom">
    <div class="flex items-center justify-between gap-2">
      <!-- 上一題 -->
      <button
        @click="$emit('prev')"
        :disabled="disabled.prev"
        class="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gray-100 text-gray-700 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-transform"
      >
        <span class="text-xl">←</span>
      </button>

      <!-- 跳轉區域 -->
      <div class="flex-1 flex items-center justify-center gap-2">
        <span class="text-sm text-gray-500">跳至</span>
        <input
          v-model.number="jumpNumber"
          type="number"
          inputmode="numeric"
          :min="1"
          :max="total"
          placeholder="#"
          class="w-16 px-2 py-2 text-center text-base border border-gray-300 rounded-lg"
          @keyup.enter="handleJump"
        />
        <button
          @click="handleJump"
          class="px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg active:scale-95 transition-transform"
        >
          GO
        </button>
      </div>

      <!-- 下一題 -->
      <button
        @click="$emit('next')"
        :disabled="disabled.next"
        class="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-xl disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-transform"
      >
        <span class="text-xl">→</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  current: number
  total: number
  disabled: {
    prev: boolean
    next: boolean
  }
}>()

const emit = defineEmits<{
  prev: []
  next: []
  jump: [index: number]
}>()

const jumpNumber = ref<number | undefined>(undefined)

const handleJump = () => {
  if (jumpNumber.value && jumpNumber.value >= 1 && jumpNumber.value <= props.total) {
    emit('jump', jumpNumber.value - 1)
  }
}
</script>

<style scoped>
.safe-area-bottom {
  padding-bottom: max(0.5rem, env(safe-area-inset-bottom));
}
</style>
