/**
 * 
 * @param {Object} obj
 * @param {AlertDialogContent} obj.content
 */
export const AlertDialog = ({ content }) => {
    return <div className="modal-content">
        <div className="modal-header p-2 px-3">
            <div className="fs-5">{content?.title ?? 'Alert'}</div>
            <button
                type="button" className="btn-close"
                data-bs-dismiss="modal"
                onClick={() => content?.onClose && content.onClose()} ></button>
        </div>
        <div className="modal-body p-2 px-3">
            <div className={`text-${content?.messageColor ?? 'danger'}`} dangerouslySetInnerHTML={{__html: content?.message ?? 'Message'}}></div>
        </div>
    </div>
}


export class AlertDialogContent {
    /** @type {String} */ title
    /** @type {String} */ message
    /** @type {'primary' | 'secondary' | 'danger' | 'warning' | 'dark' | 'light' | 'success'} */ messageColor
    /** @type {()=> void} */ onClose
}