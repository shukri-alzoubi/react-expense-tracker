const InputGroup = ({
    icon, 
    onIconClick, 
    type, 
    attributes, 
    className,
    name,
    value, 
    placeholder,
    onChange = (()=>{}),
    onClick,
    secondIcon,
    onSecondIconClick,
    readOnly,
    disabled,
}) => {

    return ( <div className={`input-group custom  bg-body-tertiary ${className}`}>
        {icon && <div className={`input-group-text ${onIconClick && 'pointer'}`} onClick={onIconClick}>{icon}</div>}
        <input 
            name={name}
            onClick={onClick}
            type={type ?? 'text'} 
            value={value ?? ''} 
            placeholder={placeholder ?? 'Enter Text'} 
            className={`form-control input-sm ${onClick && 'pointer'}`} 
            readOnly={readOnly}
            disabled={disabled}
            onChange={(e)=> {onChange && onChange(e.target.value)}}
            {...attributes} />

        {secondIcon && <div className="input-group-text pointer" onClick={onSecondIconClick}>{secondIcon}</div>}
    </div> );
}
 
export default InputGroup;