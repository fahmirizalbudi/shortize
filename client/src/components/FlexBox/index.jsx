const FlexBox = ({ children, properties }) => {
  return <div className={`flex ${properties}`}>{children}</div>
}

export default FlexBox