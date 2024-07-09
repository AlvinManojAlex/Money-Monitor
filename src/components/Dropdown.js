const Dropdown = ({ options, value, onChange }) => {
    return (
        <select className='custom-dropdown' value={value} onChange={onChange} >
            <option value='' disabled>Type of Expense</option>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}

export default Dropdown;