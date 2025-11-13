import { useEffect, useState } from "react";
import InputGroup from "../../components/ui/InputGroup";
import { useNotifier } from "../Notifier.context";

/**
 * @param {Object} obj
 * @param {TextDialogContent} obj.content 
 */
export function TextDialog({ content }) {

    const {closeModal} = useNotifier();
    const [text, setText] = useState('');

    useEffect(()=>{
        setText(content?.value ?? '');
    }, [content?.value])

    return (<>
        <div className="modal-content">
            <div className="modal-header py-2 px-3">
                <div className="fs-5">{content?.title ?? 'Enter Text'}</div>
                <button type="button" className="btn-close" data-bs-dismiss="modal" ></button>
            </div>

            {/* Form */}
            <form onSubmit={(e) => { e.preventDefault(); content?.onConfirm && content?.onConfirm(e.target['form-text']?.value); content?.autoClose && closeModal();  }}>
                <div className="modal-body py-2 px-3">
                    <InputGroup 
                        value={text}
                        onChange={(value)=> setText(value)}
                        icon={content?.icon}
                        type={content?.type ?? 'search'}
                        name='form-text'
                        placeholder={content?.placeholder ?? 'Enter Text'}
                        attributes={content?.attributes}
                    />
                </div>
                
                <div className="modal-footer p-2 py-1">

                    {/* Delete Button */}
                    {content?.onDelete &&
                        <button
                            onClick={()=> {content?.onDelete && content?.onDelete(); content?.autoClose && closeModal()}}
                            type="button"
                            className={`btn btn-${content?.deleteColor ?? 'danger'} btn-sm fs-sm`}
                            data-bs-dismiss="modal">
                            {content?.deleteText ?? 'Delete'}
                        </button>}

                    {/* Cancel Button */}
                    <button
                        type="button" onClick={()=>content?.onCancel && content.onCancel()}
                        className={`btn btn-${content?.cancelColor ?? 'secondary'} btn-sm fs-sm`}
                        data-bs-dismiss="modal">
                        {content?.cancelText ?? 'Cancel'}
                    </button>

                    {/* Confirm Button */}
                    <button
                        type="submit"
                        className={`btn btn-${content?.confirmColor ?? 'primary'} btn-sm fs-sm`}>
                        {content?.confirmText ?? 'Confirm'}
                    </button>
                </div>
            </form>
        </div>
    </>);
}

export class TextDialogContent{

    /** @type {Boolean} */ autoClose
    /** @type {String} */ title
    /** @type {Object} */ attributes
    /** @type {String} */ value
    /** @type {String} */ placeholder
    /** @type {'input' | 'date' | 'number' | 'password' | ''} */ type
    /** @type {import("react").ReactElement} */ icon
    /** @type {String} */ confirmText
    /** @type {String} */ cancelText
    /** @type {String} */ deleteText
    /** @type {'primary' | 'secondary' | 'danger' | 'warning' | 'dark' | 'light' | 'success'} */ confirmColor
    /** @type {'primary' | 'secondary' | 'danger' | 'warning' | 'dark' | 'light' | 'success'} */ cancelColor
    /** @type {String} */ deleteColor
    /** @type {(value: string)=> void} */ onConfirm
    /** @type {Function} */ onCancel
    /** @type {Function} */ onDelete
}
