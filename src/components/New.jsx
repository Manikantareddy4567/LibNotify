import React, { useState, useRef, useEffect } from "react";

function New() {
    const [formData, setFormData] = useState({
        name: "",
        rollNumber: "",
        email: "",
        phone: "",
        branch: "",
        year: "",
    });

    const [submittedData, setSubmittedData] = useState([]);
    const videoRef = useRef(null);
    const [showVideo, setShowVideo] = useState(false);

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("submittedData")) || [];
        setSubmittedData(savedData);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedData = [...submittedData, formData];
        setSubmittedData(updatedData);

        localStorage.setItem("submittedData", JSON.stringify(updatedData));

        setFormData({ name: "", rollNumber: "", email: "", phone: "", branch: "", year: "" });
    };

    const openCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setShowVideo(true);
            }
        } catch (error) {
            console.error("Error accessing webcam: ", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <h1 className="text-center text-3xl font-semiboldbold my-6 italic">
                <span className="text-blue-400 font-semibold">&lt;</span>
                L<span className='font-light'>ib</span>N<span className='font-light'>otify </span> 
                <span className="text-blue-400 font-semibold">/&gt;</span>
            </h1>

            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
                <div className="flex justify-center mb-4">
                    <div
                        className="bg-slate-300 w-40 h-40 flex justify-center items-center rounded-full cursor-pointer"
                        onClick={openCamera}
                    >
                        <i className="fa-solid fa-user-plus m-2" /> Add Image
                    </div>

                    {showVideo && (
                        <video ref={videoRef} autoPlay className="mt-4 w-80 h-60 border rounded-lg"></video>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {["name", "rollNumber", "email", "phone"].map((field) => (
                        <input
                            key={field}
                            className="w-full p-3 border rounded-md focus:outline-blue-400"
                            type="text"
                            name={field}
                            placeholder={`Enter ${field}`}
                            value={formData[field]}
                            onChange={handleChange}
                            required
                        />
                    ))}

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Select Branch</h3>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                            {["CSE", "IT", "AIML", "AI", "DS", "ECE", "EEE", "CE", "MECH"].map((branch) => (
                                <label key={branch} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="branch"
                                        value={branch}
                                        checked={formData.branch === branch}
                                        onChange={handleChange}
                                        className="accent-blue-500"
                                    />
                                    {branch}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Select Year</h3>
                        <div className="flex gap-4">
                            {["I", "II", "III", "IV"].map((year) => (
                                <label key={year} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="year"
                                        value={year}
                                        checked={formData.year === year}
                                        onChange={handleChange}
                                        className="accent-blue-500"
                                    />
                                    {year}
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        <i className="fa-solid fa-user-plus m-2"></i>ADD
                    </button>
                </form>
            </div>
        </div>
    );
}

export default New;
