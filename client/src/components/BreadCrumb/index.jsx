const BreadCrumb = ({ menu }) => {
    return (
        <div className="w-full flex justify-between font-outfit">
            <div className="flex flex-col">
                <span className="text-3xl font-base">{menu}</span>
                <div className="flex gap-3 mt-2">
                    <span className="opacity-50">Main</span>
                    <span className="opacity-50">◦</span>
                    <span className="text-[#534FEB]">{menu}</span>
                </div>
            </div>
            <div className="flex items-center justify-center font-light text-lg">{new Date().toDateString()}</div>
        </div>
    )
}

export default  BreadCrumb