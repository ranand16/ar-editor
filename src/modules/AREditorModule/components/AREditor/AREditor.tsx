import React, { ChangeEvent, useEffect, useState } from "react";
import { AugmentObject, AugmentType } from "src/interfaces/Augment";
import { DispatchProps, StateProps } from "../..";
import ARCanvasEditor from "../arCanvasEditor";

interface Props extends DispatchProps, StateProps {}

const AREditor: React.FC<Props> = ({
  helperGridStatus,
  toggleAREditorGrid,
}: Props) => {
  const [augmentData, setAugmentData] = useState<JSON>(JSON.parse("{}"));
  const [markerImage, setMarkerImage] = useState<
    string | ArrayBuffer | null | undefined
  >(null);
  const [storagePath, setStoragePath] = useState<string>("");
  const [formatError, setFormatError] = useState<string | null>(null);
  const [progressMessage, setProgressMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  let _augmentCounter = 0;

  let _threejsRef: ARCanvasEditor | null = null;

  const onAugmentChanged = (): void => {
    console.log("onAugmentChanged exec");
    const a = "undefined";
    console.log("onAugmentChanged exec", a);
  };

  const onAugmentMoved = (): void => {
    console.log("onAugmentMoved exec");
    const a = "undefined";
    console.log("onAugmentMoved exec", a);
  };

  const onMarkerLoaded = (): void => {
    console.log("onMarkerLoaded exec");
    const a = "undefined";
    console.log("onMarkerLoaded exec", a);
  };

  const saveAugmentDimension = (): void => {
    console.log("saveAugmentDimension exec");
    const a = "undefined";
    console.log("saveAugmentDimension exec", a);
  };

  const createAugmentInfoObject = (
    augmentType: AugmentType,
    augmentFileName: string
  ) => {
    const augmentObject: AugmentObject = {
      name: augmentFileName,
      augmentType: augmentType,
      scale: 100,
      xPos: 0,
      yPos: 0,
      offset: "Center",
      zIndex: 0,
      size: null,
      sourceURL: null,
      imageType: "None",
      link: null,
    };
    return augmentObject;
  };

  const addAugmentToStateAndThreejs = (
    augmentType: AugmentType,
    augmentFile: File
  ) => {
    console.log(augmentFile);

    const newAugmentInfoObject: AugmentObject = createAugmentInfoObject(
      augmentType,
      augmentFile.name
    );
    const currentAugmentId = "AG_" + _augmentCounter++;
    _threejsRef?.createAndAddAugumentAsset(
      currentAugmentId,
      newAugmentInfoObject,
      window.URL.createObjectURL(augmentFile)
    );
    setProgressMessage(null);
  };

  // on change method for marker image upload
  const onMarkerUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files?.length && files?.length > 0) {
      const file = files[0];
      const format = file.type;
      console.log(format);
      if (
        format.includes("jpg") ||
        format.includes("jpeg") ||
        format.includes("png")
      ) {
        const reader = new FileReader();
        const url = reader.readAsDataURL(file);
        reader.onloadend = function (e) {
          console.log("on marker loadend");
          setMarkerImage(e.target?.result);
        };
      } else {
        setFormatError(
          "The uploaded file is an unsupported format. Please upload image augments in .png/.jpg format only."
        );
        setProgressMessage(null);
      }
    }
  };

  useEffect(() => {
    // onMarkerLoaded();
    if (markerImage) _threejsRef?.addMarkerImage();
  }, [markerImage]);

  return (
    <div>
      <button onClick={toggleAREditorGrid}>Grid Toggle</button>
      <input type="file" onChange={onMarkerUpload} />
      <ARCanvasEditor
        augmentsData={augmentData}
        helperGridStatus={helperGridStatus}
        ref={(threejsRef) => {
          _threejsRef = threejsRef;
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
};

export default AREditor;
