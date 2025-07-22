
const API_BASE_URL = 'http://localhost:8000'

export interface FileUploadResponse {
  file_id: number
}

export interface EmbedResponse {
  status: string
  chunks: number
}

export interface ChatResponse {
  answer: string
  sources: any[]
}

export interface SearchResult {
  text: string
  meta: any
}

export interface SearchResponse {
  results: SearchResult[]
}

export interface SummaryResponse {
  summary: string
}

export interface TasksResponse {
  tasks: string
}

export interface HistoryItem {
  question: string
  answer: string
  timestamp: string
}

export interface HistoryResponse {
  history: HistoryItem[]
}

class ApiClient {
  async uploadFile(file: File): Promise<FileUploadResponse> {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    })
    
    if (!response.ok) {
      throw new Error('Upload failed')
    }
    
    return response.json()
  }

  async embedFile(fileId: number): Promise<EmbedResponse> {
    const formData = new FormData()
    formData.append('file_id', fileId.toString())
    
    const response = await fetch(`${API_BASE_URL}/embed`, {
      method: 'POST',
      body: formData,
    })
    
    if (!response.ok) {
      throw new Error('Embedding failed')
    }
    
    return response.json()
  }

  async chat(fileId: number, question: string): Promise<ChatResponse> {
    const formData = new FormData()
    formData.append('file_id', fileId.toString())
    formData.append('question', question)
    
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      body: formData,
    })
    
    if (!response.ok) {
      throw new Error('Chat failed')
    }
    
    return response.json()
  }

  async search(fileId: number, query: string): Promise<SearchResponse> {
    const response = await fetch(`${API_BASE_URL}/search?file_id=${fileId}&q=${encodeURIComponent(query)}`)
    
    if (!response.ok) {
      throw new Error('Search failed')
    }
    
    return response.json()
  }

  async getSummary(fileId: number): Promise<SummaryResponse> {
    const response = await fetch(`${API_BASE_URL}/summary?file_id=${fileId}`)
    
    if (!response.ok) {
      throw new Error('Summary failed')
    }
    
    return response.json()
  }

  async getTasks(fileId: number): Promise<TasksResponse> {
    const response = await fetch(`${API_BASE_URL}/tasks?file_id=${fileId}`)
    
    if (!response.ok) {
      throw new Error('Tasks failed')
    }
    
    return response.json()
  }

  async getHistory(fileId: number): Promise<HistoryResponse> {
    const response = await fetch(`${API_BASE_URL}/history?file_id=${fileId}`)
    
    if (!response.ok) {
      throw new Error('History failed')
    }
    
    return response.json()
  }

  getFileUrl(fileId: number): string {
    return `${API_BASE_URL}/file/${fileId}`
  }
}

export const apiClient = new ApiClient()
