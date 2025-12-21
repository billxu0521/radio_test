<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="fixed inset-0 z-50 flex items-end" @click.self="$emit('close')">
        <!-- 遮罩 -->
        <div class="absolute inset-0 bg-black/50" @click="$emit('close')"></div>

        <!-- 底部彈出視窗 -->
        <div class="relative w-full bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto animate-slide-up">
          <!-- 標題列 -->
          <div class="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900">關於本專案</h2>
            <button
              @click="$emit('close')"
              class="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
            >
              ✕
            </button>
          </div>

          <!-- 內容 -->
          <div class="px-4 py-4 space-y-4 text-sm text-gray-600">
            <!-- 題庫來源 -->
            <div>
              <p>本專案使用 國家通訊傳播委員會 2019 公告題庫</p>
              <p class="mt-1">
                本專案受到 Misawai 專案
                <a
                  href="https://github.com/Misawai/TW-HAM-radio-test-questions/"
                  target="_blank"
                  class="text-indigo-600 underline"
                >
                  TW-HAM-radio-test-questions
                </a>
                啟發
              </p>
            </div>

            <!-- 著作權聲明 -->
            <div class="text-xs text-gray-500">
              <p class="font-medium text-gray-600">著作權聲明</p>
              <p class="mt-1">本試題庫為公有領域。</p>
              <p class="mt-1">
                本試題庫所收錄之試題，係國家通訊傳播委員會依電信管理法以及業餘無線電人員及電臺管理辦法等法令所舉行之「業餘無線電人員資格測試」使用。依據中華民國著作權法第
                9 條第 1 項第 5
                款規定，「依法令舉行之各類考試試題及其備用試題」不得為著作權之標的。
              </p>
            </div>

            <!-- 專案資訊 -->
            <div class="text-xs text-gray-500 pt-3 border-t border-gray-100">
              <p>
                本專案：
                <a
                  href="https://github.com/billxu0521/radio_test"
                  target="_blank"
                  class="text-indigo-600 underline"
                >
                  github.com/billxu0521/radio_test
                </a>
              </p>
              <p class="mt-1">作者：ChihFan</p>
            </div>

            <!-- 免責聲明 -->
            <div class="text-xs text-gray-400 pt-3 border-t border-gray-100">
              <p>本工具僅供練習使用</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  visible: boolean
}>()

defineEmits<{
  close: []
}>()
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .animate-slide-up,
.modal-leave-active .animate-slide-up {
  transition: transform 0.3s ease;
}

.modal-enter-from .animate-slide-up {
  transform: translateY(100%);
}

.modal-leave-to .animate-slide-up {
  transform: translateY(100%);
}

.animate-slide-up {
  transform: translateY(0);
}
</style>
