// URL 參數管理，用於記錄和恢復學習進度

export interface UrlParams {
  class: string | null
  bank: string | null
  question: number | null
}

/**
 * 從 URL 讀取參數
 */
export function getUrlParams(): UrlParams {
  const params = new URLSearchParams(window.location.search)

  const classParam = params.get('class')
  const bankParam = params.get('bank')
  const questionParam = params.get('q')

  return {
    class: classParam && ['A', 'B', 'C'].includes(classParam) ? classParam : null,
    bank: bankParam || null,
    question: questionParam ? parseInt(questionParam, 10) : null,
  }
}

/**
 * 更新 URL 參數（不產生瀏覽歷史）
 */
export function updateUrlParams(
  classId: string | null,
  bankId: string | null,
  questionNumber: number | null
): void {
  const params = new URLSearchParams()

  if (classId) {
    params.set('class', classId)
  }
  if (bankId) {
    params.set('bank', bankId)
  }
  if (questionNumber !== null && questionNumber > 0) {
    params.set('q', questionNumber.toString())
  }

  const newUrl = params.toString()
    ? `${window.location.pathname}?${params.toString()}`
    : window.location.pathname

  window.history.replaceState({}, '', newUrl)
}
