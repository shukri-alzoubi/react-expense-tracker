import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Modal, Toast } from "bootstrap";
import { TextDialog } from "./dialogs/Text.dialog";
import { ConfirmDialog } from "./dialogs/Confirm.dialog";
import { FormDialog } from "./dialogs/Form.dialog";
import { OptionsDialog } from "./dialogs/Options.dialog";
import { LoadingDialog } from "./dialogs/Loading.dialog";
import { ToastDialog } from "./dialogs/Toast.dialog";
import { FileDialog } from "./dialogs/File.dilog";
import { AlertDialog } from "./dialogs/Alert.dialog";
import { MarkdownDialog } from "./dialogs/Markdown.dialog";

const NotifierContext = createContext(null);

/** @type {{content: Object, dialog: React.DetailedHTMLProps, options: ModalOptions}} */
const initialModalValue = { content: null, dialog: null, options: null }

export const NotifierProvider = ({ children }) => {

    // Modals
    // ===========================================================================
    const modalRef = useRef(null);
    const loadingModalRef = useRef(null);

    const [modal, setModal] = useState(initialModalValue);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Reset Modal instance whenever the modal changes
    useEffect(() => {
        const element = document.getElementById('custom-modal')
        if (!element) {
            setIsModalOpen(false)
        }

        const callback = () => { setModal(initialModalValue); setIsModalOpen(false); instance().hide() }
        element.addEventListener('hidden.bs.modal', callback);

        return () => element.removeEventListener('hidden.bs.modal', callback);
    }, [modalRef]);


    // Get or create a new bootstrap Modal instance
    const instance = (newModal) => newModal ? new Modal(modalRef.current) : Modal.getOrCreateInstance(modalRef.current);

    // Show/Hide Modal, Gets Called Everytime the isModalOpen state changes
    useEffect(() => {
        if (!modalRef.current) return;

        // check if the modal is open
        if (isModalOpen) {
            const element = document.querySelector('#custom-modal');
            // Callback
            const callback = () => { document.querySelector('#custom-modal input')?.focus() };
            // set focus on first input
            element.addEventListener('shown.bs.modal', callback, { once: true });

            instance(true).show();
        } else { instance().hide(); }

    }, [isModalOpen]);

    const openModal = async () => {
        if (isModalOpen) {
            await new Promise((resolve) => {
                setIsModalOpen(false);
                // Use microtask queue to wait until after React re-renders
                Promise.resolve().then(() => resolve(null));
            });
        }
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    /** Show Text Modal */
    const showTextModal = (content, options) => {
        setModal({ content: content, dialog: (<TextDialog content={content} />), options: { ...options } });
        openModal();
    }

    const showConfirmModal = (content, options) => {
        setModal({ content: content, dialog: (<ConfirmDialog content={content} />), options: { ...options } });
        openModal();
    }

    const showFormModal = (content, options) => {
        setModal({ content: content, dialog: (<FormDialog content={content} />), options: { ...options } });
        openModal();
    }

    const showOptionsModal = (content, options) => {
        setModal({ content: content, dialog: (<OptionsDialog content={content} />), options: { ...options, size: options?.size ?? 'modal-sm' } });
        openModal();
    }

    const showMarkdownModal = (content, options) => {
        setModal({ content: content, dialog: (<MarkdownDialog content={content} />), options: { ...options, size: options?.size ?? 'modal-xl' } });
        openModal();
    }

    const showAlertModal = (content, size) => {
        setModal({ content: content, dialog: (<AlertDialog content={content} />), options: { backdrop: 'static', scrollable: true, size: size, } });
        openModal();
    }

    const showCustomModal = (children, options) => {
        setModal({ dialog: children, options: { ...options } });
        openModal();
    }

    const showLoadingModal = (isLoading) => {
        let instance = Modal.getOrCreateInstance(loadingModalRef.current);

        if (isLoading) {
            const promise = new Promise((resolve, reject) => {
                loadingModalRef.current.addEventListener('shown.bs.modal', () => { resolve() }, { once: true })
                instance.show();
            })
            return promise;
        } else {
            instance.hide();
            const promise = new Promise((resolve, reject) => {
                loadingModalRef.current.addEventListener('hidden.bs.modal', () => { resolve() }, { once: true })

            })
            return promise;
        }
    }


    // Toast
    // ===========================================================================

    /** @type {[import('./dialogs/Toast.dialog').ToastDialogContent[]]} */
    const [toastList, setToastList] = useState([]);

    // Initialize Toasts After Appending children to toastList state
    useEffect(() => {
        let ind = toastList.length - 1;
        if (ind >= 0) {
            let instance = new Toast(document.getElementById(toastList[ind].id));
            instance.show()
        }
    }, [toastList])

    // Add A New Toast To Toast List
    const showToast = (content) => {
        content.id ??= Date.now().toString()
        let ind = toastList.findIndex((toast) => toast.id === content.id);

        if (ind >= 0) {
            let prev = [...toastList];
            prev.splice(ind, 1);
        }

        setToastList((prevList) => [...prevList, content]);
    }

    // File Dialog
    // ===========================================================================
    const fileInputRef = useRef(null);
    const [fileDilogContent, setFileDialogContent] = useState(null);

    // Watch Changes on File Dialog Content State
    useEffect(() => {
        if (fileInputRef.current && fileDilogContent) {
            fileInputRef.current.click();
        }
    }, [fileDilogContent])

    // Set File Dialog Content
    const uploadFile = (content) => {

        // Clear Content After Confirm
        let callback = content.onConfirm;
        content.onConfirm = (file) => {
            callback(file);
            setFileDialogContent(null)
        }

        // Set File Dialog Content Content
        setFileDialogContent(content);
    }

    const values = {
        showToast,
        uploadFile,
        modal,
        closeModal,
        showTextModal,
        showConfirmModal,
        showFormModal,
        showOptionsModal,
        showMarkdownModal,
        showLoadingModal,
        showAlertModal,
        showCustomModal,
    }

    return <NotifierContext.Provider value={values}>

        {/* Custom Modals */}
        <div
            ref={modalRef} id="custom-modal"
            className="modal fade"
            data-bs-backdrop={modal?.options?.backdrop ?? 'true'}
            data-bs-keyboard={modal?.options?.backdrop === 'static' ? 'false' : 'true'}
            tabIndex="-1" aria-hidden="true">
            {/* Close Modal Button */}
            <div
                className={
                    `modal-dialog  
                    ${modal?.options?.size} 
                    ${modal?.options?.scrollable && 'modal-dialog-scrollable'} 
                    ${modal?.options?.centered && 'modal-dialog-centered'} 
                    ${modal?.options?.fullScreen && 'modal-fullscreen'} 
                    `}>

                {modal.dialog && modal.dialog}
            </div>
        </div>

        {/* Loading Modal */}
        <div
            ref={loadingModalRef}
            id="loading-modal"
            className="modal fade"
            data-bs-backdrop='static'
            data-bs-keyboard='false'
            tabIndex="-1" aria-hidden="true">
            {/* Close Modal Button */}
            <div className='modal-dialog modal-sm modal-dialog-centered'>
                {<LoadingDialog />}
            </div>
        </div>

        {/* Toast Container */}
        <div className="notifier-toast-container ">
            {(toastList ?? []).map((content) => <ToastDialog key={content.id} content={content} />)}
        </div>

        {/* Upload File Input */}
        <FileDialog ref={fileInputRef} content={fileDilogContent} />

        {children}
    </NotifierContext.Provider>;
}

/** 
 * @typedef ModalOptions
 * @property {'modal-xl' | 'modal-lg' | 'modal-sm'} size
 * @property {Boolean} scrollable
 * @property {'true' | 'false' | 'static'} backdrop
 * @property {Boolean} centered
 * @property {Boolean} fullScreen
 * */

/**
 * @returns {{
 *  showToast : (content: import('./dialogs/Toast.dialog').ToastDialogContent) => void,
 *  uploadFile : (content: import('./dialogs/File.dilog').FileDialogContent) => void,
 *  openModal : ()=> void,
 *  closeModal : ()=> void,
 *  showTextModal : (content: import('./dialogs/Text.dialog').TextDialogContent, options : ModalOptions) => void,
 *  showConfirmModal : (content : import('./dialogs/Confirm.dialog').ConfirmDialogContent, options : ModalOptions) => void,
 *  showFormModal : (content: import('./dialogs/Form.dialog').FormDialogContent, options: ModalOptions) => void,
 *  showOptionsModal : (content: import('./dialogs/Options.dialog').OptionsDialogContent, options: ModalOptions) => void,
 *  showMarkdownModal : (content: import('./dialogs/Markdown.dialog').MarkdownDialogContent, options: ModalOptions) => void,
 *  showAlertModal : (content: import('./dialogs/Alert.dialog').AlertDialogContent, options: ModalOptions) => void,
 *  showLoadingModal : (isLoading: Boolean) => Promise<void>,
 *  showCustomModal : (children, options: ModalOptions) => void,
 * }}
 */
export const useNotifier = () => useContext(NotifierContext);