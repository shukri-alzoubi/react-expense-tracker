/**
 * 
 * @param {Object} obj
 * @param {FileDialogContent} obj.content
 * @param {any} obj.ref 
 * @returns 
 */
export const FileDialog = ({ ref, content }) => {
    
    // Check if the file is selected
    const submitFile = (e)=>{
        let file = e.target.files[0];
        if(file){
            content.onConfirm && content.onConfirm(file);
        }
    }

    return (<div className="upload-file-dialog">
        <input 
            type="file" onChange={submitFile}
            ref={ref} accept={content?.extentions ?? '.pdf'} 
            id="upload-file-dialog-input" className="d-none" />
    </div>)
}

export class FileDialogContent {
    /** @type {String} e.g.  (.pdf, .png, ...) */ extentions
    /** @type {(file: File)=> void} */ onConfirm
}