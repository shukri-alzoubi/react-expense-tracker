import { useState } from "react";
import { useNotifier } from "../Notifier.context";
import DatePicker from "react-datepicker";

/**
 * @param {Object} obj 
 * @param {FormDialogContent} obj.content 
 */
export const FormDialog = ({ content }) => {

    const { closeModal } = useNotifier();
    const [dates, setDates] = useState([]);
    const [passwordsVisiblity, setPasswordsVisiblity] = useState([]);

    const submitForm = (event) => {
        event.preventDefault(); // Stop Form From Reloading the page

        // Set Data
        let data = {};
        (content?.formEntries ?? []).forEach((entry) => data[entry.name] = event.target[entry.name].value);

        content?.onSubmit && content.onSubmit(data);
        content?.autoClose && closeModal();
    }

    const getFormElements = () => {

        return (content?.formEntries ?? []).map((entry, ind) => {
            
            let element = '';

            switch (entry.type) {
                case 'textarea':
                    element = (<textarea name={entry.name} defaultValue={entry.value} className="form-control input-sm" placeholder={entry.placeholder}  {...entry.attributes}  >
                    </textarea>);
                    break;

                case 'select':
                    element = (<select name={entry.name} className="form-control input-sm" defaultValue={entry.value} placeholder={entry.placeholder}  {...entry.attributes}  >
                        {entry.children}
                    </select>);
                    break;

                case 'date':
                    if (!dates.find((d) => d.name === entry.name)) {
                        setDates([...dates, { name: entry.name, value: entry.value }]);
                    }

                    element = (
                        <DatePicker
                            adjustDateOnChange
                            className="form-control input-sm pointer"
                            placeholderText={entry.placeholder}
                            name={entry.name}
                            selected={dates.find((d) => d.name === entry.name)?.value}
                            onChange={(date) => setDates((prev) => prev.map((d) => d.name === entry.name ? { name: entry.name, value: date } : d))}
                            isClearable
                            dateFormat="MM/dd/yyyy"
                        />);
                    break;

                case 'password':
                    if (!passwordsVisiblity.find((p) => p.name === entry.name)) {
                        setPasswordsVisiblity((prev) => [...prev, { name: entry.name, visible: false }]);
                    }
                    element = (<input type={passwordsVisiblity.find((p) => p.name === entry.name)?.visible ? 'text' : 'password'} name={entry.name} className="form-control input-sm" defaultValue={entry.value} placeholder={entry.placeholder} autoCorrect="off" autoCapitalize="off" spellCheck={false}   {...entry.attributes} />);
                    break;
                default:
                    element = (<input type={entry.type} name={entry.name} className="form-control input-sm" defaultValue={entry.value} placeholder={entry.placeholder}  {...entry.attributes} />);
            }

            return (
                <div key={ind} className={`input-group custom bg-body-tertiary ${ind < (content?.formEntries.length - 1) && 'mb-3'}`}>
                    {element}
                    {entry.type === 'password' && 
                        <span 
                            onClick={()=> {setPasswordsVisiblity(passwordsVisiblity.map((elem)=> elem.name === entry.name ? {...elem, visible: !elem.visible} : elem))}}
                            className="input-group-text pointer">
                            <i className={`fa-solid fa-eye text-${passwordsVisiblity.find((p) => p.name === entry.name)?.visible ? 'primary' : 'secondary'}`}></i>
                        </span>}
                </div>)
        })
    }

    return (<>
        <form className="modal-content" onSubmit={submitForm}>
            <div className="modal-header py-2 px-3">
                <div className="modal-label fs-5" id="liveFormDialogLabel">
                    {content?.title ?? content.message ?? 'Enter Text'}
                </div>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body py-2 px-3">
                {/* Form Message */}
                {content?.title && content.message && (<div className="mb-3 text-danger fs-sm">
                    {content?.message}
                </div>)}

                {/* Form Entries */}
                {getFormElements()}

                {/* Alerts */}
                <div className="form-text fs-sm text-danger mx-1 text-center ">{content?.alertText}</div>
            </div>

            <div className="modal-footer p-2 py-1">
                {/* Delete Button */}
                {content.onDelete && <button
                    type="button" onClick={(e) => { content.onDelete && content.onDelete(); content?.autoClose && closeModal(); }}
                    className={`btn btn-${content?.deleteColor ?? 'danger'} btn-sm fs-sm`}>
                    {content?.deleteText ?? 'Delete'}
                </button>}

                {/* Cancel Button */}
                <button
                    type="button" onClick={(e) => { content.onCancel && content.onCancel(); closeModal(); }}
                    className={`btn btn-${content?.cancelColor ?? 'secondary'} btn-sm fs-sm`}
                    data-bs-dismiss="modal">
                    {content?.cancelText ?? 'Cancel'}
                </button>

                {/* Confirm Button */}
                <button
                    type="submit"
                    className={`btn btn-${content?.submitColor ?? 'primary'} btn-sm fs-sm`}>
                        {content?.submitText ?? 'Save'}
                    </button>
            </div>
        </form>
    </>);
}



export class FormDialogContent {

    /**
     * @typedef FormEntryAttibute
     * @property {String} name
     * @property {String} value
     */

    /**
     * @typedef FormEntry
     * @property {'text' | 'password' | 'number' | 'textarea' | 'select' | 'date' | 'datetime-local'} type
     * @property {String} name
     * @property {String} value
     * @property {String} placeholder
     * @property {Element[]} children
     * @property {Object} attributes An Object Array Of {name, value}
     */

    /** @type {Boolean} */ autoClose

    /** @type {String} */ title
    /** @type {String} */ message
    /** @type {String} */ alertText

    /** @type {String} */ submitText
    /** @type {String} */ cancelText
    /** @type {String} */ deleteText

    /** @type {'primary' | 'secondary' | 'danger' | 'warning' | 'dark' | 'light' | 'success'} */ submitColor
    /** @type {'primary' | 'secondary' | 'danger' | 'warning' | 'dark' | 'light' | 'success'} */ cancelColor
    /** @type {'primary' | 'secondary' | 'danger' | 'warning' | 'dark' | 'light' | 'success'} */ deleteColor

    /** @type {Array<FormEntry>} */ formEntries

    /** @type {(data: {formEntry: value})=> void} */ onSubmit
    /** @type {()=> void} */ onCancel
    /** @type {()=> void} */ onDelete
}