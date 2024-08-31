const Input = ({ placeholder, value, onChange }) => {
    return (
        <input type="number" className="custom-input" placeholder={placeholder} value={value} onChange={onChange} />
    )
}

export default Input;