import {useEffect, useReducer} from "react";
import Dropzone from 'react-dropzone';
import upload from '../assets/upload.svg';
import './FileUpload.css';

// Event handler for files
function reducer(files : any, action : any) : any {
    switch (action.key) {
        case 'PREVIEW':
            const newFiles : any = {};
            for (let fileId in files) {
                if (action.fileId === fileId) {
                    newFiles[fileId] = {preview: action.preview};
                } else {
                    newFiles[fileId] = {preview: files[fileId].preview};
                }
            }
            return newFiles;
        default:
            return files;
    }
}

// Wrapper component for file uploads
export default function FileUpload() {
    const [files, dispatch] = useReducer(reducer,
        {'comparisonFile' : {preview: upload}, 'referenceFile' : {preview : upload}});

    // Updates file previews by calling event handler
    const handleOnDrop = (fileId : string, acceptedFiles : any[]) => {
        dispatch( {key: 'PREVIEW', fileId: fileId, preview: URL.createObjectURL(acceptedFiles[0])} );
    }

    // prevent memory leaks by deleting uri
    useEffect(() => {
        return () => {
            URL.revokeObjectURL(files['comparisonFile'].preview);
            URL.revokeObjectURL(files['referenceFile'].preview);
        }
    });

    return (
        <div>
            <Dropzone onDrop={ (acceptedFiles) => {
                handleOnDrop('comparisonFile', acceptedFiles);
            }}>
                {({getRootProps, getInputProps, isDragActive}) => (
                    <form className={isDragActive ? "dragged" : "default"} id="fileUploadComparison">
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {
                                isDragActive ?
                                    <p>Drop the file here</p> :
                                    <p>Click, or drag and drop the comparison file here</p>
                            }
                            <img src={files['comparisonFile'].preview}
                                 alt="Upload comparison file"
                                 onLoad={() => { URL.revokeObjectURL(files['comparisonFile'].preview) }}/>
                        </div>
                    </form>
                )}
            </Dropzone>

            <Dropzone onDrop={(acceptedFiles) => {
                handleOnDrop('referenceFile', acceptedFiles);
            }}>
                {({getRootProps, getInputProps, isDragActive}) => (
                    <form className={isDragActive ? "   dragged" : "default"} id="fileUploadReference">
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {
                                isDragActive ?
                                    <p>Drop the file here</p> :
                                    <p>Click, or drag and drop the reference file here</p>
                            }
                            <img src={files['referenceFile'].preview}
                                 alt="Upload reference file"
                                 onLoad={() => { URL.revokeObjectURL(files['referenceFile'].preview) }}/>
                        </div>
                    </form>
                )}
            </Dropzone>
        </div>
    )
}