// src/pages/Tutor/components/ProgressReportBox.tsx

interface ProgressReportProps {
  fileName: string
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  id?: string // <--- Thêm ID vào đây để nhận diện vị trí cuộn
}

const ProgressReportBox = ({ fileName, onFileChange, id }: ProgressReportProps) => {
  return (
    <section id={id} className='bg-white rounded-lg shadow-md p-6'>
      <h2 className='text-xl font-bold text-[#B3261E] mb-1 '>Progress Report</h2>
      <div className='h-0.5 w-1/4 bg-gradient-to-r from-[#B3261E] to-transparent mb-4'></div>

      <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4'>
        <div>
          <label className='text-sm font-medium text-gray-700 block mb-1'>Upload</label>
          <p className='text-xs text-gray-500 mt-1'>Supported formats: PDF, Docx. Max file size: 10MB</p>
        </div>

        <div>
          <input type='file' id='report-upload' className='hidden' onChange={onFileChange} />
          <label
            htmlFor='report-upload'
            className='cursor-pointer text-sm text-[#B3261E] font-semibold bg-red-100 hover:bg-red-200 px-4 py-2 rounded-lg transition-colors'
          >
            Update
          </label>
          <span className='ml-4 text-sm text-gray-500'>{fileName ? fileName : 'No file selected'}</span>
        </div>
      </div>
    </section>
  )
}

export default ProgressReportBox
