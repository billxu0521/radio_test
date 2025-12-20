<template>
  <div class="w-full max-w-2xl mx-auto">
    <div class="flex justify-between text-sm text-gray-600 mb-1">
      <span>進度</span>
      <span>{{ current }} / {{ total }}</span>
    </div>
    <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        class="h-full bg-blue-600 transition-all duration-300"
        :style="{ width: `${percentage}%` }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  current: number
  total: number
}>()

const percentage = computed(() =>
  props.total > 0 ? (props.current / props.total) * 100 : 0
)
</script>
