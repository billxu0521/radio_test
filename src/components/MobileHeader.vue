<template>
  <div class="fixed top-0 left-0 right-0 z-10 bg-white border-b border-gray-200">
    <!-- 標題列 -->
    <div class="px-3 py-2 text-center border-b border-gray-100">
      <h1 class="text-base font-semibold text-gray-900">
        台灣無線電題庫
        <span class="text-blue-600">記憶卡片</span>
      </h1>
    </div>

    <!-- 選擇器列 -->
    <div class="px-3 py-2 flex items-center justify-between gap-2">
      <!-- 等級選擇 -->
      <select
        :value="store.currentClass"
        @change="handleClassChange"
        class="flex-shrink-0 px-2 py-1.5 text-sm border border-gray-300 rounded-lg bg-white font-medium"
      >
        <option v-for="(name, id) in CLASS_NAMES" :key="id" :value="id">
          {{ name }}
        </option>
      </select>

      <!-- 題庫選擇 -->
      <select
        :value="store.currentBankId || ''"
        @change="handleBankChange"
        class="flex-1 min-w-0 px-2 py-1.5 text-sm border border-gray-300 rounded-lg bg-white truncate"
      >
        <option value="" disabled>選擇題庫</option>
        <option v-for="bank in store.banks" :key="bank.id" :value="bank.id">
          {{ bank.title }}
        </option>
      </select>

      <!-- 進度 -->
      <div class="flex-shrink-0 text-sm font-medium text-gray-600">
        <span class="text-blue-600">{{ store.progress.current }}</span>
        <span class="text-gray-400">/</span>
        <span>{{ store.progress.total }}</span>
      </div>

      <!-- 重置按鈕 -->
      <button
        @click="handleReset"
        class="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
        title="重置"
      >
        <span class="text-base">⟲</span>
      </button>

      <!-- 資訊按鈕 -->
      <button
        @click="$emit('showInfo')"
        class="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
      >
        <span class="text-base">ⓘ</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFlashCardStore, CLASS_NAMES } from '@/stores/flashCardStore'

const store = useFlashCardStore()

defineEmits<{
  showInfo: []
}>()

const handleClassChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  store.switchClass(target.value)
}

const handleBankChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  if (target.value) {
    store.selectBank(target.value)
  }
}

const handleReset = () => {
  store.reset()
}
</script>
