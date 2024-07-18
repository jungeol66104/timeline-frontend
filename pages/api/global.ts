import api from "@/pages/api/api";

export const fetchEvents = async (id: number, page: number, isKeynote: boolean) => {
    try {
        const response = await api.get(`/timeline/${id}/paged?pageNum=${page}&pageSize=41&isSummary=${isKeynote}`, {headers: {lang: 'en'}})
        return response.data.data
    } catch (error) {
        console.error('Error fetching data in useEffect: ', error)
        return
    }
}