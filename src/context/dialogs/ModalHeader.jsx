const ModalHeader = ({ label = 'Modal' }) => {
    return (<div className="modal-header py-2 px-1 mb-3">
        <div className="modal-title fs-6">{label}</div>
        <button type="button" className="btn-close border-0 shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>);
}

export default ModalHeader;