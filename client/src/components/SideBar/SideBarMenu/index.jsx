import { Link, useLocation } from "react-router-dom"

const SideBarMenu = ({Icon, navigate, title }) => {
    const location = useLocation()
    const currentPath = location.pathname
    const isActive = currentPath === navigate
    return (
        <Link to={navigate} className={`w-full h-14 rounded p-5 opacity-50 flex gap-4 items-center transition-all duration-150 ease-linear ${isActive && `bg-[#534FEB] opacity-100 text-white`}`}>
            <Icon size={22} className="ms-2"/>
            <span className="text-lg line leading-5 relative top-1/21.9">{title}</span>
        </Link>
    )
}

export default SideBarMenu