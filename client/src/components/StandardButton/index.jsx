const StandardButton = ({ text, onClick, buttonType = "button", properties }) => <button className={properties} onClick={onClick} type={buttonType}>{text}</button>

export default StandardButton