import avatar from '../../assets/user.webp'

const TopBar = () => {
    return (
        <div className="w-[calc(100%-calc(var(--spacing)*75)))] h-20 fixed left-75 font-outfit flex items-center px-10 justify-between">
            <div>
                <p className="text-2xl">Welcome Back <span className="font-medium">, Ramadhan</span><span className="ms-3">👋</span></p>
            </div>
            <div className="flex items-center gap-3">
                <img src={avatar} alt="User Avatar" width={37} className="rounded-full"/>
            </div>
        </div>
    )
}

export default TopBar