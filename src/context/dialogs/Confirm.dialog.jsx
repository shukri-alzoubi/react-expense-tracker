import { useNotifier } from "../Notifier.context";

export const ConfirmDialog = ({ content }) => {
    const {closeModal} = useNotifier();

    return (<>
        <div className="modal-content">
            <div className="modal-header py-2 px-3">
                <div className="modal-title fs-6">{content?.title ?? 'Confirm!'}</div>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body py-2 px-3">
                <div className="text-secondary message fs-md" dangerouslySetInnerHTML={{__html: content?.message ?? 'Message'}}></div>
            </div>

            <div className="modal-footer p-2 py-1">

                {/* Cancel Button */}
                <button
                    type="button" onClick={()=> content?.onCancel && content.onCancel()} 
                    className={`btn btn-${content?.cancelColor ?? 'secondary'} btn-sm fs-sm m-0`}
                    data-bs-dismiss="modal">
                        {content?.cancelText ?? 'Cancel'}
                    </button>

                {/* Confitm Button */}
                <button 
                    type="button" onClick={()=> {content?.onConfirm && content.onConfirm(); content?.autoClose && closeModal()}} 
                    className={`btn btn-${content?.confirmColor ?? 'primary'} btn-sm fs-sm`} 
                >{content?.confirmText ?? 'Confirm'}</button>
            </div>
        </div>
    </>);
}


// Confirm Dialog Parameter Object
export class ConfirmDialogContent {
    /** @type {String} */ title
    /** @type {Boolean} */ autoClose
    /** @type {String} */message
    /** @type {String} */confirmText
    /** @type {String} */cancelText
    /** @type {'primary' | 'danger' | 'warning' | 'dark' | 'light' | 'success'} */confirmColor
    /** @type {'primary' | 'danger' | 'warning' | 'dark' | 'light' | 'success'} */cancelColor
    /** @type {Function} */ onConfirm() { }
    /** @type {Function} */ onCancel() { }
}