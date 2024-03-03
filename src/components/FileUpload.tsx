import {useEffect, useReducer} from "react";
import Dropzone from 'react-dropzone';
import upload from '../assets/upload.svg';
import './FileUpload.css';

// Event handler for files
function reducer(files : any, action : any) : any {
    // TODO: conditionally select media element (preview) depending on file type
    switch (action.key) {
        case 'PREVIEW':
            const newFiles : any = {};
            for (let fileId in files) {
                if (action.fileId === fileId) {
                    newFiles[fileId] = {preview: action.preview};
                } else {
                    newFiles[fileId] = {preview: files[fileId].preview}; // keeps same
                }
            }
            return newFiles;
        default:
            return files;
    }
}

// Wrapper component for file uploads
export default function FileUpload(props : { name: string }) {
    const [file, dispatch] = useReducer(reducer,
        {[props.name] : {type: 'image', preview: upload}});

    // Updates file previews by calling event handler
    const handleOnDrop = (fileId : string, acceptedFiles : any[]) => {
        dispatch( {key: 'PREVIEW', fileId: fileId, preview: URL.createObjectURL(acceptedFiles[0])} );
    }

    // prevent memory leaks by deleting uri
    useEffect(() => {
        return () => {
            URL.revokeObjectURL(file[props.name].preview);
        }
    });

    return (
        <div id={props.name + "Upload"} className="fileUpload">
            <Dropzone
                accept={
                    { /* Specify allowed file types */
                       'image/*': ['jpeg', 'jpg', 'png'],
                        'video/*': ['mp4']
                    }
                }
                onDrop={ (acceptedFiles) => {
                    handleOnDrop(props.name, acceptedFiles);
                }
            }>
                {({getRootProps, getInputProps, isDragActive}) => (
                    <div className={isDragActive ? "dropzoneDragged" : "dropzone"} id={props.name + "Dropzone"} {...getRootProps()}>
                        <input {...getInputProps()}/>
                        <div className={props.name + "DraggedText"}>
                            {
                                file[props.name].preview === upload ?
                                    [
                                        isDragActive ?
                                            <p>Drop the file here</p> :
                                            <p>Click, or drag and drop the {props.name} file here</p>
                                    ] :
                                    "" /* Remove text if image is already uploaded */
                            }
                        </div>
                        <div className={props.name + "Preview"}>
                            <img className={isDragActive ? "previewDragged" : "preview"}
                                 src={file[props.name].preview}
                                 alt={"Upload " + props.name + " file"}
                                 onLoad={() => { URL.revokeObjectURL(file[props.name].preview) }} />
                        </div>
                    </div>
                )}
            </Dropzone>
            // Add X button if preview
        </div>
    )
}