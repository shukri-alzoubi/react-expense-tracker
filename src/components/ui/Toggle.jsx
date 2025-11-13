const Toggle = ({active = false, color = 'primary', onClick}) => {
    return ( <span className="pointer" onClick={onClick}>
        <i className={`fa-solid fa-toggle-${active ? 'on' : 'off'} text-${color} fa-xl`}></i>
    </span> );
}
 
export default Toggle;