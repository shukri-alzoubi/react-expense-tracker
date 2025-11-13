import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateGroup = ({ icon, placeholder, selected, onChange = (() => {}), className, withPortal = false, withTime = false }) => {
    return (<div className={`input-group custom bg-body-tertiary ${className ?? 'mb-3'}`}>
        <div className="d-flex align-items-center gap-2 w-100 px-2">
            <div className="input-group-text fs-sm">
                {icon}
            </div>

            <DatePicker 
                selected={selected}
                onChange={onChange}
                showTimeSelect={withTime}
                timeIntervals={withTime ? 15 : null}
                dateFormat={withTime ? "dd/MM/yyyy h:mm aa" : null}
                timeFormat={withTime ? "HH:mm" : null}
                placeholderText={placeholder}
                withPortal={withPortal}
                className="form-control bg-body-tertiary input-sm flex-grow-1 pointer"
                isClearable
            />
        </div>
    </div>);
}

export default DateGroup;