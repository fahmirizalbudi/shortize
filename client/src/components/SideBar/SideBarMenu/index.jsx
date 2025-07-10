const SideBarMenu = ({ isActive, Icon, navigate, title, onSelectedMenu }) => {
    return (
        <a href={navigate} className={`w-full h-14 rounded p-5 opacity-50 flex gap-4 items-center transition-all duration-150 ease-linear ${isActive === title && `bg-[#534FEB] opacity-100 text-white`}`} onClick={onSelectedMenu}>
            <Icon size={22} className="ms-2"/>
            <span className="text-lg line leading-5 relative top-1/21.9">{title}</span>
        </a>
    )
}

export default SideBarMenu