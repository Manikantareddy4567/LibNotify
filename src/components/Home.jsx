import React, { useState, useEffect } from 'react';
import Status from '/src/components/Status';

const Home = () => {
    const [submittedData, setSubmittedData] = useState([]);

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("submittedData")) || [];
        setSubmittedData(savedData);
    }, []);

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 px-4">
            <h2 className="text-2xl font-semibold mb-4 pt-5 text-center">Details</h2>
            <div className="w-full overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead className="bg-blue-400 text-white text-xs md:text-sm">
                        <tr>
                            <th className="py-3 px-4 md:px-7 border">Name</th>
                            <th className="py-3 px-4 md:px-7 border">Roll Number</th>
                            <th className="py-3 px-4 md:px-7 border">Email</th>
                            <th className="py-3 px-4 md:px-7 border">Phone</th>
                            <th className="py-3 px-4 md:px-7 border">Branch</th>
                            <th className="py-3 px-4 md:px-7 border">Year</th>
                            <th className="py-3 px-4 md:px-7 border">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-slate-100 text-xs md:text-base">
                        {submittedData.map((data, index) => (
                            <tr key={index} className="border-b">
                                <td className="p-2 md:p-3 border text-center">{data.name}</td>
                                <td className="p-2 md:p-3 border text-center">{data.rollNumber}</td>
                                <td className="p-2 md:p-3 border text-center">
                                    <a href={`mailto:${data.email}`} className="hover:text-blue-600 hover:underline">
                                        {data.email}
                                    </a>
                                </td>
                                <td className="p-3 border text-center">
                                    <a href={`tel:${data.phone}`} className="hover:text-blue-600 hover:underline">
                                        {data.phone}
                                    </a>
                                </td>
                                <td className="p-2 md:p-3 border text-center">{data.branch}</td>
                                <td className="p-2 md:p-3 border text-center">{data.year}</td>
                                <td className="p-2 md:p-3 border text-center">
                                    <a
                                        className="text-blue-700 hover:underline"
                                        href="/status"
                                        rel="noopener noreferrer"
                                    >
                                        View
                                    </a>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default Home;
