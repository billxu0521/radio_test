// 單一題目
export interface Question {
  questionNumber: number
  question: string
  correctAnswer: number // 1-4，對應 answers 索引
  answers: string[] // 4 個選項
  picture: boolean
  pictureURL: string
}

// 題庫
export interface QuestionBank {
  title: string
  questions: Question[]
}

// 題庫檔案資訊
export interface QuestionBankInfo {
  id: string // 檔案名稱（不含 .json）
  filename: string // 完整檔名
  title: string // 題庫標題
  count: number // 題目數量
}
