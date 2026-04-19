import { useEffect } from "react"
import { useDispatch } from "react-redux"
import axios from "axios"
import { setSavedJobs } from "@/redux/jobSlice"
import { SAVED_API_END_POINT } from "@/utils/constant"

const useGetSavedJobs = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchSavedJobs = async () => {
            try {
                const res = await axios.get(`${SAVED_API_END_POINT}/`, {
                    withCredentials: true,
                })
                if (res.data.success) {
                    dispatch(setSavedJobs(res.data.savedJobs))
                }
            } catch (error) {
                console.error("Fetch saved jobs error:", error)
            }
        }
        fetchSavedJobs()
    }, [dispatch])
}

export default useGetSavedJobs