<template>
  <div class="flex flex-wrap gap-2 justify-center">
    <button
      v-for="bank in banks"
      :key="bank.id"
      @click="$emit('select', bank.id)"
      class="px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer"
      :class="
        bank.id === selectedId
          ? 'bg-blue-600 text-white shadow-lg'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      "
    >
      {{ bank.title }} ({{ bank.count }})
    </button>
  </div>
</template>

<script setup lang="ts">
import type { QuestionBankInfo } from '@/types'

defineProps<{
  banks: QuestionBankInfo[]
  selectedId: string | null
}>()

defineEmits<{
  select: [id: string]
}>()
</script>
