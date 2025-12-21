<template>
  <div class="flex justify-center gap-2">
    <button
      v-for="(name, id) in CLASS_NAMES"
      :key="id"
      @click="store.switchClass(id)"
      class="px-6 py-2 rounded-lg text-base font-semibold transition-all cursor-pointer"
      :class="
        store.currentClass === id
          ? 'bg-indigo-600 text-white shadow-lg'
          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
      "
    >
      {{ name }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useFlashCardStore, CLASS_NAMES } from '@/stores/flashCardStore'

const store = useFlashCardStore()
</script>
