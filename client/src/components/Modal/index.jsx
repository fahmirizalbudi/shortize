import "./../../styles/Micromodal.css"
const Modal = ({ children, modalId, modalHeader, loading, onHandle }) => {
    return (
        <div
            className="modal micromodal-slide"
            id={modalId}
            aria-hidden="true"
        >
            <div
                className="modal__overlay"
                tabIndex={-1}
            >
                <div
                    className="modal__container"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={`${modalId}-title`}
                >
                    <header className="modal__header">
                        <h2 className="modal__title font-outfit" id={`${modalId}-title`}>
                            {modalHeader}
                        </h2>
                        <button
                            className="modal__close cursor-pointer"
                            aria-label="Close modal"
                            data-micromodal-close
                        />
                    </header>
                    <main className="modal__content font-outfit">
                        {children}
                    </main>
                    <footer className="modal__footer font-outfit">
                        <button className={`rounded bg-[#534FEB] w-20 flex items-center justify-center px-5 py-2 text-md text-white relative ${loading ? "disabled cursor-not-allowed" : "cursor-pointer"}`}  type="submit" onClick={onHandle}>
                            {loading ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : "Submit"}
                        </button>
                        <button
                            className="rounded cursor-pointer bg-stone-200 px-5 py-2 text-md text-stone-900"
                            data-micromodal-close
                            aria-label="Close this dialog window"
                        >
                            Close
                        </button>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default Modal