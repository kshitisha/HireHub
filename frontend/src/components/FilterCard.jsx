import React from 'react'

const FilterCard = ({ filters, setFilters }) => {

    const locations = ["Remote", "Delhi","Gurgaon","Noida", "Bangalore", "Mumbai", "Pune","Chennai","Kolkata", "Hyderabad"];
    const roles = [
  "Frontend Developer", 
  "Backend Developer", 
  "Full Stack", 
  "AI/ML, Data Science", 
  "Devops",
  "Mobile Developer",
  "Site Reliability Engineer",
  "Platform Engineer",
  "Data Engineer",
  "MLOps Engineer",
  "Security Engineer",
  "QA Automation",
  "Cloud Architect",
  "Embedded Systems",
  "UI/UX Designer",
  "Product Manager",
  "Solutions Architect",
  "Blockchain Developer",
  "Developer Advocate",
  "Systems Administrator"
];
    const salaries = [
        "₹0 – ₹40,000",
        "₹40,000 – ₹1,00,000",
        "₹1,00,000+"
    ];

    const handleFilterChange = (type, value) => {
        setFilters(prev => ({
            ...prev,
            [type]: value
        }));
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">

            <h2 className="font-semibold text-lg mb-4 text-black">
                Refine Results
            </h2>

            {/* LOCATION */}
            <div className="mb-4">
                <p className="text-sm font-medium mb-2 text-gray-600">Location</p>
                <div className="flex flex-wrap gap-2">
                    {locations.map((loc) => (
                        <button
                            key={loc}
                            onClick={() => handleFilterChange("location", loc)}
                            className="px-3 py-1 rounded-full border text-sm hover:bg-black hover:text-white transition"
                        >
                            {loc}
                        </button>
                    ))}
                </div>
            </div>

            {/* ROLE */}
            <div className="mb-4">
                <p className="text-sm font-medium mb-2 text-gray-600">Role</p>
                <div className="flex flex-wrap gap-2">
                    {roles.map((role) => (
                        <button
                            key={role}
                            onClick={() => handleFilterChange("role", role)}
                            className="px-3 py-1 rounded-full border text-sm hover:bg-black hover:text-white transition"
                        >
                            {role}
                        </button>
                    ))}
                </div>
            </div>

            {/* SALARY */}
            <div>
                <p className="text-sm font-medium mb-2 text-gray-600">Salary</p>
                <div className="flex flex-wrap gap-2">
                    {salaries.map((sal) => (
                        <button
                            key={sal}
                            onClick={() => handleFilterChange("salary", sal)}
                            className="px-3 py-1 rounded-full border text-sm hover:bg-black hover:text-white transition"
                        >
                            {sal}
                        </button>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default FilterCard;