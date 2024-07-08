const Input = ({ placeholder, value, onChange }) => {
    return (
        <input type="text" className="custom-input" placeholder={placeholder} value={value} onChange={onChange} />
    )
}

export default Input;