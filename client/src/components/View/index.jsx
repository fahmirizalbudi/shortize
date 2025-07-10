const View = ({ children }) => {
    return (
        <div className="w-[calc(100%-calc(var(--spacing)*75)))] ms-75 py-8 px-10">
            {children}
        </div>
    )
}

export default View