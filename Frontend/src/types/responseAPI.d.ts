export interface ApiResponse<T> {
  success: boolean
  statusCode: number
  message: string
  data: T
  timestamp?: string
}

export interface PaginatedData<T> {
  data: T[]
  totalItems: number
  currentPage: number
  totalPages: number
  pageSize: number
}

// Type kết hợp Pagination vào ApiResponse
export type ApiListResponse<T> = ApiResponse<PaginatedData<T>>
