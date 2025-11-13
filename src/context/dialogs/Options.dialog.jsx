/**
 * 
 * @param {Object} obj 
 * @param {OptionsDialogContent} obj.content 
 * @returns 
 */

import { useNotifier } from "../Notifier.context";

export const OptionsDialog = ({ content }) => {

    const { closeModal } = useNotifier()

    return (<div className="modal-content of-none">
        <div className="modal-header py-2 px-3">
            <div className="modal-title fs-6 fw-semibold">{content?.title ?? 'Options'}</div>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body p-0 of-none">
            <ul className="list-group list-group-flush rounded-0">
                
                {/* Options */}
                {(content?.options ?? [])
                    .map((option) =>
                        <li
                            key={option.id} onClick={() => {(content?.autoClose && closeModal()); (content.onConfirm && content.onConfirm(option.id));}}
                            className={`list-group-item list-group-item-action fs-sm ${content?.id === option.id && 'active'}`}>
                            {option.value}
                        </li>)}

                {/* Cancel Button */}
                {content?.onCancel && <li
                    onClick={() => content?.onCancel && content.onCancel()}
                    data-bs-dismiss="modal"
                    className={`list-group-item list-group-item-action text-center text-bg-${content?.cancelColor ?? 'secondary'} fs-sm`}>
                    {content?.cancelText ?? 'cancel'}
                </li>}
            </ul>
        </div>
    </div>)
}

export class OptionsDialogContent {
    /** @type {String} */ title
    /** @type {String} */ id
    /** @type {{id: String, value: String,}[]} */ options
    
    /** @type {Boolean} */ autoClose

    /** @type {'primary' | 'secondary' | 'danger' | 'warning' | 'dark' | 'light'} */ cancelColor
    /** @type {String} */ cancelText

    /** @type {(id: String)=> void} */ onConfirm
    /** @type {()=> void} */ onCancel
}