/**
 * @param {Object} obj
 * @param {String} obj.className
 * @param {{ key: String, value: String, icon: String, color: String }[]} obj.options
 * @param {String[]} obj.selected
 * @param {String} obj.label
 * @param {*} obj.icon
 * @param {true | false | 'outside'} obj.autoClose
 * @param {(key: String)=>void} obj.onClick
 * @returns 
 */

const Select = ({ options = [], selected = [], label, icon, onClick, autoClose = 'outside', className }) => {
    return (<>
        <div className="dropdown">
            <button
                className={`btn fs-sm ${className ?? 'border-0 bg-body-tertiary text-start'}`}
                type='button'
                data-bs-toggle='dropdown'
                data-bs-auto-close={autoClose} // 👈 keeps open
                aria-expanded="false">
                {icon} {label}
            </button>

            <div className="dropdown-menu h-mx-30 of-auto text-start fs-sm">
                {options.map((option) =>
                    <li key={option.key}>
                        <button
                            type='button'
                            className={`dropdown-item ${selected.includes(option.key) && 'active'}`}
                            onClick={() => onClick && onClick(option.key)}>
                            <i className={`${option.icon} me-2`} style={{ color: option.color }}></i>
                            {option.value}
                        </button></li>)}
            </div>
        </div>
    </>);
}

export default Select;