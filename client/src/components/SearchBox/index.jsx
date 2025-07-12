
import { BiSearch } from "react-icons/bi";
const SearchBox = ({ hint, onSearch }) => {
    return (
        <div className="px-10 py-[10px] font-outfit border-1 border-stone-200 rounded flex flex-column items-center">
            <BiSearch size={21} className="relative right-4 text-stone-400"/>
            <input type="text" placeholder={hint} onInput={onSearch} className="outline-0 text-stone-600 placeholder:text-stone-400" />
        </div>
    )
}

export default SearchBox