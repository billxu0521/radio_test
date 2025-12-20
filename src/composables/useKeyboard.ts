import { onMounted, onUnmounted } from 'vue'
import { useFlashCardStore } from '@/stores/flashCardStore'

export function useKeyboard() {
  const store = useFlashCardStore()

  const handleKeydown = (event: KeyboardEvent) => {
    // 忽略輸入框中的鍵盤事件
    if (
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement
    ) {
      return
    }

    switch (event.code) {
      case 'ArrowLeft':
        event.preventDefault()
        store.prevQuestion()
        break

      case 'ArrowRight':
        event.preventDefault()
        store.nextQuestion()
        break

      case 'Space':
        event.preventDefault()
        store.flipCard()
        break
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
  })

  return {
    prev: () => store.prevQuestion(),
    next: () => store.nextQuestion(),
    flip: () => store.flipCard(),
  }
}
