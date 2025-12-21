import { ref } from 'vue'

// 滑動配置
const SWIPE_CONFIG = {
  minSwipeDistance: 50,      // 最小水平位移 (px)
  maxVerticalDistance: 30,   // 最大垂直偏差 (px)
  maxSwipeDuration: 1000,    // 最長時間 (ms)
  debounceDelay: 150,        // 防抖延遲 (ms)
}

export function useSwipe(
  onSwipeLeft: () => void,
  onSwipeRight: () => void
) {
  const touchStart = ref({ x: 0, y: 0, time: 0 })
  const isSwiping = ref(false)
  const isProcessing = ref(false)

  const onTouchStart = (e: TouchEvent) => {
    if (isProcessing.value) return

    const touch = e.touches[0]
    touchStart.value = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    }
    isSwiping.value = false
  }

  const onTouchEnd = (e: TouchEvent) => {
    if (isProcessing.value) return

    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - touchStart.value.x
    const deltaY = touch.clientY - touchStart.value.y
    const duration = Date.now() - touchStart.value.time

    // 判斷是否為有效滑動
    const isValidSwipe =
      Math.abs(deltaX) > SWIPE_CONFIG.minSwipeDistance &&
      Math.abs(deltaY) < SWIPE_CONFIG.maxVerticalDistance &&
      duration < SWIPE_CONFIG.maxSwipeDuration &&
      Math.abs(deltaX) > Math.abs(deltaY) // 水平位移大於垂直位移

    if (isValidSwipe) {
      isSwiping.value = true
      isProcessing.value = true

      if (deltaX < 0) {
        // 左滑 = 下一題
        onSwipeLeft()
      } else {
        // 右滑 = 上一題
        onSwipeRight()
      }

      // 防抖：禁用後續操作
      setTimeout(() => {
        isProcessing.value = false
        isSwiping.value = false
      }, SWIPE_CONFIG.debounceDelay)
    }
  }

  return {
    onTouchStart,
    onTouchEnd,
    isSwiping,
  }
}
