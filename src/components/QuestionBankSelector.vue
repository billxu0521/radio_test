<template>
  <div class="flex justify-center">
    <select
      :value="selectedId || ''"
      @change="handleChange"
      class="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[200px]"
    >
      <option value="" disabled>請選擇題庫</option>
      <option v-for="bank in banks" :key="bank.id" :value="bank.id">
        {{ bank.title }} ({{ bank.count }}題)
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import type { QuestionBankInfo } from '@/types'

defineProps<{
  banks: QuestionBankInfo[]
  selectedId: string | null
}>()

const emit = defineEmits<{
  select: [id: string]
}>()

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  if (target.value) {
    emit('select', target.value)
  }
}
</script>
