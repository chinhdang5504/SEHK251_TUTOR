import PrivateAxios from '@/lib/privateAxios'

const facultyApi = {
    /* <--- Fetch all faculties ---> */
    async getAllFaculties() {
        const res = await PrivateAxios.get('/faculties')
        return res.data
    },
}

export default facultyApi