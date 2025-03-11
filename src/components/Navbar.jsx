import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <nav className='flex justify-between items-center p-4 bg-blue-400 text-white relative'>
                <div className='logo italic font-semibold text-2xl'>
                    <span>&lt;</span>
                    L<span className='font-light'>ib</span>N<span className='font-light'>otify</span>
                    <span>/&gt;</span>
                </div>
                
                <div className='md:hidden'>
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>

                <ul className='hidden md:flex space-x-6'>
                    <NavLink to="/" className={({ isActive }) => isActive ? "font-bold underline" : ""}><li className='hover:underline cursor-pointer'>Home</li></NavLink>
                    <NavLink to="/new-user" className={({ isActive }) => isActive ? "font-bold underline" : ""}><li className='hover:underline cursor-pointer'>New User</li></NavLink>
                    {/* <NavLink to="/contacts" className={({ isActive }) => isActive ? "font-bold underline" : ""}><li className='hover:underline cursor-pointer'>Contacts</li></NavLink> */}
                </ul>

                {/* Sidebar for small screens */}
                <div className={`absolute top-0 left-0 w-full h-full bg-blue-400 text-white shadow-md transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform md:hidden`}> 
                    <button className='absolute top-4 right-4' onClick={() => setIsOpen(false)}>
                        <FiX size={24} />
                    </button>
                    <ul className='flex flex-col items-start p-6 space-y-6 mt-10 bg-blue-400'>
                        <NavLink to="/" className={({ isActive }) => isActive ? "font-bold underline" : ""} onClick={() => setIsOpen(false)}><li>Home</li></NavLink>
                        <NavLink to="/new-user" className={({ isActive }) => isActive ? "font-bold underline" : ""} onClick={() => setIsOpen(false)}><li>New User</li></NavLink>
                        {/* <NavLink to="/contacts" className={({ isActive }) => isActive ? "font-bold underline" : ""} onClick={() => setIsOpen(false)}><li>Contacts</li></NavLink> */}
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;