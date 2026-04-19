import React, { useEffect } from 'react'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'
import { ArrowLeft } from 'lucide-react'
import { Button } from '../ui/button'

const Applicants = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { applicants } = useSelector(store => store.application)

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const res = await axios.get(
                    `${APPLICATION_API_END_POINT}/${id}/applicants`,
                    { withCredentials: true }
                )
                if (res.data.success) {
                    dispatch(setAllApplicants(res.data.job))
                }
            } catch (error) {
                console.error("Fetch applicants error:", error)
            }
        }
        fetchApplicants()
    }, [id])

    return (
        <div className='max-w-6xl mx-auto my-10 px-4'>
            <div className='flex items-center gap-4 mb-6'>
                <Button
                    variant="outline"
                    onClick={() => navigate("/admin/jobs")}
                    className="flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Jobs
                </Button>
                <div>
                    <h1 className='font-bold text-xl'>
                        Applicants
                        <span className='ml-2 text-gray-500 font-normal text-base'>
                            ({applicants?.applications?.length || 0} total)
                        </span>
                    </h1>
                </div>
            </div>

            <ApplicantsTable />
        </div>
    )
}

export default Applicants