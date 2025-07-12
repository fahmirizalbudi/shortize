import logo from "../../assets/logo.png";
import {BiLink, BiSolidGrid, BiUser} from "react-icons/bi";
import SideBarMenu from "./SideBarMenu/index.jsx";
const SideBar = () => {
    return (
        <div className="w-75 flex min-h-screen fixed bg-[#f5f5f5] pb-8 px-8 items flex-col font-outfit">
            <img src={logo} alt="Logo" className="h-fit w-60 relative right-9 bottom-2" loading={"lazy"}/>
            <div className="flex w-full flex-col gap-3">
                <SideBarMenu Icon={BiSolidGrid} title="Interface" navigate="/admin"/>
                <SideBarMenu Icon={BiUser} title="Users" navigate="/admin/users"/>
                <SideBarMenu Icon={BiLink} title="Links" navigate="/admin/links"/>
            </div>
        </div>
    )
}

export default SideBar