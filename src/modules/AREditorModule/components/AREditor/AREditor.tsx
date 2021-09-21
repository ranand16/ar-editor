import React, { ChangeEvent, useEffect, useState } from 'react';
import { DispatchProps, StateProps } from '../..';
import ARCanvasEditor from '../arCanvasEditor';

interface Props extends DispatchProps, StateProps {}

const AREditor: React.FC<Props> = ({ 
    helperGridStatus, 
    toggleAREditorGrid 
}: Props) => {

    const [augmentData, setAugmentData] = useState<JSON>(JSON.parse("{}"));
    const [markerImage, setMarkerImage] = useState<string | ArrayBuffer | null | undefined>(null);
    const [storagePath, setStoragePath] = useState<string>("");
    const [formatError, setFormatError] = useState<string | null>(null);
    const [progressMessage, setProgressMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    let _threejsRef: (ARCanvasEditor | null) = null;
    const onAugmentChanged = () => {

    }

    const onAugmentMoved = () => {

    }

    const onMarkerLoaded = () => {

    }

    const saveAugmentDimension = () => {

    }

    // on change method for marker image upload 
    const onMarkerUpload = (e: ChangeEvent<HTMLInputElement>): void => {
        let files = e.target.files;
        if(files?.length && files?.length > 0) {
            let file = files[0];
            let format = file.type;
            console.log(format);
            if(format.includes("jpg") || format.includes("jpeg") ||format.includes("png")){
                var reader = new FileReader();
                var url = reader.readAsDataURL(file);
                reader.onloadend = function (e) {
                    console.log("on marker loadend");
                    setMarkerImage(e.target?.result);
                }

            } else {
                setFormatError("The uploaded file is an unsupported format. Please upload image augments in .png/.jpg format only.");
                setProgressMessage(null);
            }    
        }
    }

    useEffect(()=> {
        // onMarkerLoaded();
        if(markerImage) _threejsRef?.addMarkerImage();
    },[markerImage]);

    return (
        <div>
            <button onClick={toggleAREditorGrid}>Grid Toggle</button>
            <input type="file" onChange={onMarkerUpload} />
            <ARCanvasEditor
                augmentsData={augmentData}
                helperGridStatus={helperGridStatus}
                ref={(threejsRef) => {
                    _threejsRef = threejsRef
                }}
                onAugmentChanged={onAugmentChanged}
                onAugmentMoved={onAugmentMoved}
                markerImage={markerImage}
                onMarkerLoaded={onMarkerLoaded}
                saveAugmentDimension={saveAugmentDimension}
                sourcePath={storagePath}
            // iconAssets={IconAssets}
            />
        </div>
        
    );
}

export default AREditor;
