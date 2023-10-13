import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/Edulogoo.png";
import { BiMenu } from "react-icons/bi";
import { GrClose } from "react-icons/gr"
import LoginModal from "./LoginModal";

const Navbar = () => {

  const [modalOpen, setModalOpen] = useState(false);
  const [mobilenavOpen, setmobilenavOpen] = useState(false)

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleMobileNav = () => {
    setmobilenavOpen(!mobilenavOpen)
  }

  const closeModal = () => {
    setModalOpen(false);
  };



  return (
    <>
      <nav className="  w-full relative pr-5 flex justify-between px-2 h-16 py-2 items-center">
        <a className="px-2 cursor-pointer" href="/">
          <img src={Logo} className="w-24 aspect-auto" />
        </a>
        <div className="flex justify-end items-center space-x-4 text-xl">
          <ul className="hidden md:flex md:justify-between md:items-center space-x-4 ">
            <li className="block px-3 py-2 rounded">
              <NavLink to='/' className={({ isActive }) => isActive ? 'text-blue-500 pb-1' : 'text-gray-700'} >Home</NavLink>
            </li>
            <li className="block px-3 py-2 rounded">
              <NavLink to='/blogs' className={({ isActive }) => isActive ? 'text-blue-500 pb-1' : 'text-gray-700'} >Blogs</NavLink>
            </li>
            <li className="block px-3 py-2 rounded">
              <NavLink to='/courses2' className={({ isActive }) => isActive ? 'text-blue-500 pb-1' : 'text-gray-700'} >Course</NavLink>
            </li>
            <li className="block px-3 py-2 rounded">
              <NavLink to='/contact' className={({ isActive }) => isActive ? 'text-blue-500 pb-1' : 'text-gray-700'} >Contact</NavLink>
            </li>
           

          </ul>

          
          <div className=' flex-col gap-2 border-l-2 border-l-red-500 pl-8 hidden md:flex' >
          <span onClick={toggleModal} className="rounded items-center p-2 bg-emerald-400 text-gray-700 cursor-pointer hover:bg-emerald-300">Login</span>
          </div>
          <span className="cursor-pointer md:hidden" onClick={toggleMobileNav}>
            {
              mobilenavOpen ?
                <GrClose className='w-6 h-6' />
                :
                <BiMenu className='w-6 h-6' />
            }
          </span>
        </div>

        {
          mobilenavOpen &&
          <div className="absolute inset-x-0 bg-white top-14 z-10 md:hidden border-t-2">
            <ul className="text-center md:hidden md:justify-between md:items-center">
              <li className="block px-3 py-2 rounded">
                <NavLink to='/' className={({ isActive }) => isActive ? 'text-blue-500 pb-1' : 'text-gray-700'} >Home</NavLink>
              </li>
              <li className="block px-3 py-2 rounded">
                <NavLink to='/blogs' className={({ isActive }) => isActive ? 'text-blue-500 pb-1' : 'text-gray-700'} >Blogs</NavLink>
              </li>
              <li className="block px-3 py-2 rounded">
              <NavLink to='/course2' className={({ isActive }) => isActive ? 'text-blue-500 pb-1' : 'text-gray-700'} >Course2</NavLink>
            </li>
            <li className="block px-3 py-2 rounded">
              <NavLink to='/contact' className={({ isActive }) => isActive ? 'text-blue-500 pb-1' : 'text-gray-700'} >Contact</NavLink>
            </li>
              
              {/* again for button */}

              <li className='  gap-2 border-l-2 border-t-red-500 my-2' >
              <span onClick={toggleModal} className="rounded items-center p-2 bg-emerald-400 text-gray-700 cursor-pointer hover:bg-emerald-300">Login</span>
          </li>
            </ul>
          </div>
        }

      </nav>
      <LoginModal isOpen={modalOpen} setIsOpen={setModalOpen} />
    </>
  )
}


export default Navbar;