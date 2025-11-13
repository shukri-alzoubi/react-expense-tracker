import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { useNotifier } from "../Notifier.context";



export const MarkdownDialog = ({ content }) => {
    const {closeModal} = useNotifier();

    const [editMode, setEditMode] = useState(false);
    const [value, setValue] = useState('');

    useEffect(()=>{
        setValue(content?.text ?? '')
    }, [content?.text])

    return (<>
        <div className="modal-content">
            <div className="modal-header py-2 px-3">
                <div className="modal-title fs-5">{content?.title ?? 'Markdown!'}</div>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body py-2 px-3">
                <div className="markdown-container">
                    {!editMode && <ReactMarkdown
                        rehypePlugins={[rehypeRaw]}
                        remarkPlugins={[remarkGfm]}
                    >
                        {value ?? ''}
                    </ReactMarkdown>}

                    {editMode && <textarea
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="form-control h-70 of-auto"></textarea>}
                </div>
            </div>
            <div className="modal-footer d-flex justify-content-between p-2 py-1">

                {!editMode && <button
                    type="button" onClick={() => setEditMode(!editMode)}
                    className='btn btn-secondary btn-sm fs-sm'>
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>}

                {editMode && <button
                    type="button" onClick={() => setEditMode(!editMode)}
                    className='btn btn-success btn-sm fs-sm'>
                    <i className="fa-solid fa-check"></i>
                </button>}

                {!editMode && <div>
                    {/* Cancel Button */}
                    <button
                        type="button" onClick={() => content?.onCancel && content.onCancel()}
                        className={`btn btn-${content?.cancelColor ?? 'secondary'} btn-sm fs-sm mx-1`}
                        data-bs-dismiss="modal">
                        {content?.cancelText ?? 'Cancel'}
                    </button>

                    {/* Confitm Button */}
                    <button
                        type="button" onClick={() => {content?.onConfirm && content.onConfirm(value); content?.autoClose && closeModal();}}
                        className={`btn btn-${content?.confirmColor ?? 'primary'} btn-sm fs-sm mx-1`}>
                        {content?.confirmText ?? 'Confirm'}
                    </button>
                </div>}
            </div>
        </div>
    </>);
}


// Markdown Dialog Parameter Object
export class MarkdownDialogContent {
    /** @type {String} */ title
    /** @type {Boolean} */ autoClose
    /** @type {String} */text
    /** @type {String} */confirmText
    /** @type {String} */cancelText
    /** @type {'primary' | 'danger' | 'warning' | 'dark' | 'light'} */ confirmColor
    /** @type {'primary' | 'danger' | 'warning' | 'dark' | 'light'} */ cancelColor
    /** @type {(value: String) => void} */ onConfirm(value) { }
    /** @type {Function} */ onCancel() { }
}