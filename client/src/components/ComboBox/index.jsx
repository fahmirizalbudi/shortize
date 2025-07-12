const ComboBox = ({ className, onChange, identifier, value, withLabel = false, labelName, withValidation = false, validate, children }) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            {withLabel && (
                <label htmlFor={identifier} className="text-base">{labelName}</label>
            )}
            <select id={identifier} className={`border-1 ${value === "" && "text-[#999999]"} border-stone-300 w-full px-6 py-[15px] rounded outline-0 text-[16.5px] ${className}`} name={identifier} onChange={onChange} value={value} >
                {children}
            </select>
            {withValidation && (
                <small className="text-sm text-red-500">{validate}</small>
            )}
        </div>
    )
}

ComboBox.Option = ({ value, hint, asPlaceholder }) => (
    asPlaceholder ? (
        <option value={value} className="text-black" >{hint}</option>
    ) : (
        <option value={value} className="text-black" >{hint}</option>
    )
)

export default ComboBox