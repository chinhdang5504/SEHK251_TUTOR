import Header from '@/components/Header/Header'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'
import { SSO_URL } from '@/utils/constant'

const TestPage = () => {
  return (
    // 🔹 Dùng flex-col + min-h-screen để tạo layout sticky footer chuẩn
    <div className='min-h-screen flex flex-col bg-white'>
      <Header />
      <div className='flex flex-1'>
        <Sidebar />

        {/* Nội dung chính chiếm phần còn lại */}
        <main className='flex-1 ml-0 xl:ml-[282px] pt-24 p-8'>
          <h1 className='text-3xl font-bold'>Test UI Components</h1>
          <p className='mt-4'>Đây là nội dung test thôi nha!</p>
        </main>
      </div>

      {/* Footer luôn ở cuối */}
      <Footer />
    </div>
  )
}

export default TestPage
