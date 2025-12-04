import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { downloadDocument, getDocuments, uploadDocument } from '@/api/libraryApi'
import { allDocuments } from '@/mocks/library.mock'

export const useLibrary = (page: number, limit: number, useApi = false) => {
  const queryClient = useQueryClient()

  const { data, isLoading, isError, isPlaceholderData } = useQuery({
    queryKey: ['documents', page, limit],

    queryFn: async () => {
      if (!useApi) {
        await new Promise((resolve) => setTimeout(resolve, 500))

        const start = (page - 1) * limit
        const end = page * limit
        const mockDocs = allDocuments.slice(start, end)
        const totalPages = Math.ceil(allDocuments.length / limit)

        return {
          data: mockDocs,
          totalPages: totalPages
        }
      }

      const res = await getDocuments({ page, limit })
      return res
    },

    placeholderData: (previousData) => previousData
  })

  const { mutate: uploadDoc, isPending: isUploading } = useMutation({
    mutationFn: async (formData: FormData) => {
      if (!useApi) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return { message: 'Mock upload success' }
      }
      return await uploadDocument(formData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      alert('Upload successful!')
    },
    onError: (error) => {
      console.error(error)
      alert('Upload failed! Please try again.')
    }
  })

  const { mutate: downloadDoc, isPending: isDownloading } = useMutation({
    mutationFn: async ({ id, fileName }: { id: number; fileName: string }) => {
      if (!useApi) {
        alert(`Downloading simulation file: ${fileName}`)
        return
      }
      return await downloadDocument(id)
    }
  })

  return {
    documents: data
      ? ('data' in data && data.data
        ? (Array.isArray(data.data) ? data.data : (data.data as any).data || [])
        : [])
      : [],
    totalPages: data
      ? ('totalPages' in data
        ? data.totalPages
        : ('data' in data && data.data && 'totalPages' in data.data ? data.data.totalPages : 0))
      : 0,

    isLoading,
    isError,
    isPlaceholderData,
    isUploading,
    isDownloading,

    uploadDoc,
    downloadDoc
  }
}
