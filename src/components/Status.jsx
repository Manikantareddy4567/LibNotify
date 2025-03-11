import React, { useState, useEffect } from "react";

const Status = () => {
    const [bookData, setBookData] = useState({
        bookName: "",
        startDate: "",
        endDate: "",
        fine: 0,
    });

    const [bookList, setBookList] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "startDate") {
            const startDate = new Date(value);
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 7);

            setBookData({
                ...bookData,
                [name]: value,
                endDate: endDate.toISOString().split("T")[0],
                fine: 0, 
            });
        } else {
            setBookData({ ...bookData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setBookList([...bookList, bookData]);
        setBookData({ bookName: "", startDate: "", endDate: "", fine: 0 });
    };

    const calculateFine = (endDate) => {
        const today = new Date();
        const dueDate = new Date(endDate);
        const diffDays = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24));

        return diffDays > 0 ? diffDays * 10 : 0;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setBookList((prevList) =>
                prevList.map((book) => ({
                    ...book,
                    fine: calculateFine(book.endDate),
                }))
            );
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 px-4 py-6">
            <h2 className="text-2xl font-semibold mb-6 text-center">Book Status</h2>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg mb-6"
            >
                <h3 className="text-xl font-semibold mb-4 text-center">Add a Book</h3>

                <input
                    className="w-full p-3 border rounded-md mb-3 focus:outline-blue-400"
                    type="text"
                    name="bookName"
                    placeholder="Enter Book Name"
                    value={bookData.bookName}
                    onChange={handleChange}
                    required
                />
                <input
                    className="w-full p-3 border rounded-md mb-3 focus:outline-blue-400"
                    type="date"
                    name="startDate"
                    value={bookData.startDate}
                    onChange={handleChange}
                    required
                />
                <input
                    className="w-full p-3 border rounded-md mb-3 focus:outline-blue-400 bg-gray-200"
                    type="date"
                    name="endDate"
                    value={bookData.endDate}
                    readOnly
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300"
                >
                    <i className="fa-solid fa-plus"></i> ADD
                </button>
            </form>

            <div className="w-full max-w-4xl">
                <table className="table-auto min-w-full border-collapse border border-gray-300">
                    <thead className="bg-blue-400 text-white text-sm md:text-base">
                        <tr>
                            <th className="p-3 border">Name of Book</th>
                            <th className="p-3 border">Start Date</th>
                            <th className="p-3 border">End Date</th>
                            <th className="p-3 border">Fine (₹)</th>
                        </tr>
                    </thead>
                    <tbody className="bg-slate-100 text-sm md:text-base">
                        {bookList.map((book, index) => (
                            <tr key={index} className="border-b">
                                <td className="p-3 border text-center">{book.bookName}</td>
                                <td className="p-3 border text-center">{book.startDate}</td>
                                <td className="p-3 border text-center">{book.endDate}</td>
                                <td className="p-3 border text-center text-red-600 font-semibold">
                                    ₹{book.fine}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Status;
