import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.error("Fetch company by ID error:", error);
            }
        };
        if (companyId) fetchCompany();
    }, [companyId, dispatch]);
};

export default useGetCompanyById;