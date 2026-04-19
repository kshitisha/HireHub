import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${JOB_API_END_POINT}/get?keyword=${searchedQuery || ""}`
        );
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllJobs();
  }, [searchedQuery, dispatch]);

  return { loading };
};

export default useGetAllJobs;