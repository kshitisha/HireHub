import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { ArrowLeft, Globe, MapPin, Mail, Phone } from 'lucide-react'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'

const CompanyProfile = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [company, setCompany] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${id}`, {
                    withCredentials: true,
                })
                if (res.data.success) setCompany(res.data.company)
            } catch (error) {
                toast.error("Failed to load company profile.")
            } finally {
                setLoading(false)
            }
        }
        fetchCompany()
    }, [id])

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto p-4">
                <div className="animate-pulse space-y-4">
                    <div className="h-32 bg-gray-200 rounded-lg"></div>
                    <div className="h-64 bg-gray-200 rounded-lg"></div>
                </div>
            </div>
        )
    }

    if (!company) {
        return (
            <div className="max-w-4xl mx-auto p-4 text-center py-12">
                <h2 className="text-2xl font-semibold text-gray-900">Company not found</h2>
                <Button onClick={() => navigate(-1)} className="mt-4" variant="outline">Go Back</Button>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <Button onClick={() => navigate(-1)} variant="outline" className="mb-6 flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Back
            </Button>

            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-start gap-6">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        {company.logo ? (
                            <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white text-2xl font-bold">
                                {company.name?.charAt(0)}
                            </div>
                        )}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
                        {company.description && (
                            <p className="text-gray-600 mt-1 text-sm">{company.description}</p>
                        )}
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        {company.website && (
                            <div className="flex items-center gap-3 text-sm">
                                <Globe className="w-4 h-4 text-gray-400" />
                                <a
                                    href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    {company.website}
                                </a>
                            </div>
                        )}
                        {company.location && (
                            <div className="flex items-center gap-3 text-sm">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-700">{company.location}</span>
                            </div>
                        )}
                    </div>

                    <div className="space-y-3">
                        {company.contact?.email && (
                            <div className="flex items-center gap-3 text-sm">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-700">{company.contact.email}</span>
                            </div>
                        )}
                        {company.contact?.phone && (
                            <div className="flex items-center gap-3 text-sm">
                                <Phone className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-700">{company.contact.phone}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyProfile