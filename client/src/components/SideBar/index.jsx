import logo from "../../assets/logo.png";
import {BiHomeAlt2, BiLink, BiUser} from "react-icons/bi";
import SideBarMenu from "./SideBarMenu/index.jsx";
import {useState} from "react";

const SideBar = ({ menuActive }) => {
    const [sideBarMenuActive, setSideBarMenuActive] = useState("Quick View")
    return (
        <div className="w-75 flex h-full fixed bg-[#f5f5f5] pb-8 px-8 items flex-col font-outfit">
            <img src={logo} alt="Logo" className="h-fit w-60 relative right-9 bottom-1"/>
            <div className="flex w-full flex-col gap-3">
                <SideBarMenu Icon={BiHomeAlt2} isActive={sideBarMenuActive} title="Quick View" navigate="#" onSelectedMenu={() => setSideBarMenuActive("Quick View")}/>
                <SideBarMenu Icon={BiUser} isActive={sideBarMenuActive} title="Users" navigate="#" onSelectedMenu={() => setSideBarMenuActive("Users")}/>
                <SideBarMenu Icon={BiLink} isActive={sideBarMenuActive} title="Links" navigate="#" onSelectedMenu={() => setSideBarMenuActive("Links")}/>
            </div>
        </div>
    )
}

export default SideBar