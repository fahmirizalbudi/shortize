const TextBox = ({ hint, className, onChange, identifier, value, type = "text", withLabel = false, labelName, withValidation = false, validate, validateColor }) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            {withLabel && (
                <label htmlFor={identifier} className="text-base">{labelName}</label>
            )}
            <input type={type} id={identifier} className={`border-1 border-stone-300 w-full px-6 py-[15px] rounded outline-0 text-[16.5px] ${className}`} name={identifier} onChange={onChange} placeholder={hint} autoComplete="off" value={value} />
            {withValidation && (
                <small className={`text-sm ${!validateColor ? "text-red-500" : validateColor}`}>{validate}</small>
            )}
        </div>
    )
}

export default TextBox