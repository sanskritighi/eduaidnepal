import React, { useState, useEffect } from 'react'
import Logo from "../assets/Edulogoo.png";
import { CgProfile } from "react-icons/cg";
import { GiOpenBook } from "react-icons/gi";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import {AiOutlineRightCircle} from 'react-icons/ai'
import { RiSettings4Line } from "react-icons/ri";
import { BsPencilSquare, BsFillBellFill } from "react-icons/bs";
import { MdOutlinePassword } from "react-icons/md";
import { TbCategory } from "react-icons/tb";
import {ImAddressBook} from "react-icons/im";
import {MdOutlineAddCard} from "react-icons/md";
import {FcAdvertising} from "react-icons/fc";
import {  MdWorkspaces} from "react-icons/md";
import { Link } from "react-router-dom";



const LinkMenuItem = ({ menu, index, open }) => {
    return (

        <Link to={menu?.link} key={index} className={`flex mx-4 items-center text-sm gap-3.5 font medium p-2 hover:bg-gray-800 rounded-md`} >
            <div className='relative group'>
                {React.createElement(menu?.icon, { size: "20" })}

            </div>
            <h2 style={{
                transitionDelay: `${index + 3}00ms`,
            }}
                className={`whitespace-pre duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'}`}>{menu?.name}
            </h2>
        </Link>
    )
}

const ToggleMenuItem = ({ menu, index, open }) => {

    const [submenuOpen, setSubmenuOpen] = useState(false);

    const toggleSubmenu = () => {
        setSubmenuOpen(prevVal => !prevVal)
    }

    useEffect(() => {
        !open && setSubmenuOpen(false)
        return () => {
        }
    }, [open])


    return (
        <>
        
            <div onClick={toggleSubmenu} key={index} className={`flex mx-4 hover:cursor-pointer items-center text-sm gap-3.5 font medium p-2 hover:bg-gray-800 rounded-md`} >
                <div className='relative group'>
                    {React.createElement(menu?.icon, { size: "20" })}

                </div>
                <h2 style={{
                    transitionDelay: `${index + 3}00ms`,
                }}
                    className={`whitespace-pre duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'}`}>{menu?.name}
                </h2>
                <span style={{
                    transitionDelay: `${index + 3}00ms`,
                }}
                    className={`inline-flex justify-end w-full items-center duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'}`}>{
                        submenuOpen ?
                            <FaSortUp /> :
                            <FaSortDown />
                    }
                </span>


            </div>
            {submenuOpen && open ?
                <div className='ml-5 border-l-2'>
                    {
                        menu.submenus.map(
                            (submenuItem, subindex) => (
                                <LinkMenuItem key={index+subindex} menu={submenuItem} index={index + subindex} open={open} />
                            )
                        )
                    }
                </div>
                :
                <></>
            }
        </>

    )
}
const Sidebar = ({ open, toggleSidebar }) => {
    const sidemenus = [

        { name: "Profile", link: "/profile", icon: CgProfile, has_submenus: false },
        { name: "Course", link: "/course", icon: GiOpenBook, has_submenus: false },
        { name: "Exam", link: "/exam", icon: BsPencilSquare, margin: true, has_submenus: false },
        { name: "Add Courses", link: "/addcourse", icon: ImAddressBook, has_submenus: false},
        { name: "Add Subject", link: "/addsubject", icon: MdOutlineAddCard, has_submenus: false },
        
        {
            name: "Settings",
            link:"/settings",
            icon: RiSettings4Line,
            has_submenus: true,
            submenus: [
                { name: "Change password", link: "/changepass", icon: MdOutlinePassword },
                { name: "Category select", link: "/categoryselect", icon: TbCategory},
               
            ]
        },
       
      
        {
            name: "Advertisment",
            link:"/advertisment",
            icon:FcAdvertising ,
            has_submenus: true,
            submenus: [
                { name: "Area", link: "/area", icon: MdWorkspaces},
               
            ]
        },
        
    ]
    return (
        <>
            <div className={`bg-gray-700 h-screen md:h-full ${open ? 'w-64 z-10 absolute top-0 left-0 md:relative md:z-0' : ' fixed top-0 left-0 md:w-16 md:relative w-0'} duration-500 text-gray-100`}>
                {
                    open ?
                    <h2 className='font-semibold text-white text-2xl p-3 ml-5 overflow-x-hidden'>
                    Admin
                    </h2>
                    :
                    <h2 className='font-semibold text-sm text-center text-white p-3 ml-0 overflow-x-hidden'>
                    ADM
                    </h2>
               
                
                }
                <div className='h-14 overflow-x-hidden md:hidden'>
                    <div className="w-32 h-full object-cover">
                        <img src={Logo} className="scale-75" />
                    </div>

                </div>
                <span onClick={toggleSidebar} className='invisible md:visible absolute -right-2.5 top-2.5 bg-gray-700 rounded-full cursor-pointer md:block'>
                    <AiOutlineRightCircle className={`w-6 h-6 ${open && 'rotate-180'}`}/>
                </span>
                <div className='mt-4 md:mt-10 flex flex-col gap-4 relative overflow-x-hidden'>

                    {
                        sidemenus.map((menuitem, index) => (

                            menuitem.has_submenus ?
                                <ToggleMenuItem key={index} menu={menuitem} index={index} open={open} /> :
                                <LinkMenuItem key={index} menu={menuitem} index={index} open={open} />
                        )
                        )
                    }

                </div>
            </div>
        </>
    )
}

export default Sidebar
