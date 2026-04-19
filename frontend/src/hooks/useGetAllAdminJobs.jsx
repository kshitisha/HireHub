import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAllAdminJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.error("Fetch admin jobs error:", error);
            }
        };
        fetchAdminJobs();
    }, [dispatch]);
};

export default useGetAllAdminJobs;