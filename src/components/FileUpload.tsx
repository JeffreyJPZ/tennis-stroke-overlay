import {useEffect, useState} from "react";
import Dropzone from 'react-dropzone';
import upload from '../assets/upload.svg';
import './FileUpload.css';

// Wrapper component for file uploads
export default function FileUpload() {
    const [comparisonFile, setComparisonFile] = useState({
        preview: upload
    });
    const [referenceFile, setReferenceFile] = useState({
        preview: upload
    });

    // prevent memory leaks by deleting uri
    useEffect(() => {
        URL.revokeObjectURL(comparisonFile.preview);
        URL.revokeObjectURL(referenceFile.preview);
    });

    return (
        <div>
            <Dropzone onDrop={ (acceptedFiles) => {
                // callback to make image preview fill dropzone
                setComparisonFile(Object.assign(acceptedFiles[0],
                    {preview: URL.createObjectURL(acceptedFiles[0])}));
            }}>
                {({getRootProps, getInputProps, isDragActive}) => (
                    <form className={isDragActive ? "dragged" : "default"} id="fileUploadComparison">
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {
                                isDragActive ?
                                    <p>Drop the image here</p> :
                                    <p>Click, or drag and drop an image here</p>
                            }
                            <img src={comparisonFile.preview}
                                 alt="Upload comparison image"
                                 onLoad={() => { URL.revokeObjectURL(comparisonFile.preview) }}/>
                        </div>
                    </form>
                )}
            </Dropzone>

            <Dropzone onDrop={(acceptedFiles) => {
                setReferenceFile(Object.assign(acceptedFiles[0],
                    {preview: URL.createObjectURL(acceptedFiles[0])}));
            }}>
                {({getRootProps, getInputProps, isDragActive}) => (
                    <form className={isDragActive ? "dragged" : "default"} id="fileUploadReference">
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {
                                isDragActive ?
                                    <p>Drop the image here</p> :
                                    <p>Click, or drag and drop an image here</p>
                            }
                            <img src={referenceFile.preview}
                                 alt="Upload reference image"
                                 onLoad={() => { URL.revokeObjectURL(referenceFile.preview) }}/>
                        </div>
                    </form>
                )}
            </Dropzone>
        </div>
    )
}