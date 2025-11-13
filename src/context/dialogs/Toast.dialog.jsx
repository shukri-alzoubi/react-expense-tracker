
/**
 * @param {Object} obj
 * @param {ToastDialogContent} obj.content
 */
export const ToastDialog = ({ content }) => {

    return <div
        onClick={()=> content?.onClick && content?.onClick(content)}
        role="alert" aria-live="assertive" aria-atomic="true" id={content?.id}
        className={`live-toast toast align-items-center border-0 mb-2 text-bg-${content?.color ?? 'primary'}`}>
        <div className="d-flex">
            <div className="toast-body">
                <span className="message">{content?.message ?? ''}</span>
            </div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    </div>
}


export class ToastDialogContent {
    /** @type {String} */ id
    /** @type {String} */ message
    /** @type {() => void } */ onClick
    /** @type {'primary' | 'danger' | 'warning' | 'dark' | 'light' | 'success'} */ color
}