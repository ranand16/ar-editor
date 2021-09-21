import React, { Component } from 'react';
import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { CSS3DObject, CSS3DRenderer } from './Threejs/CSS3DRenderer'



class ARCanvasEditor extends Component {

  constructor(props) {
    super(props)

    this._tempMarkerData = "";
    this._augmentsData = props.augmentsData;
    this._markerImage = null;
    this._augumentImagesArray = [];
    this._augmentObjectsGroup = null;



    this._isClicked = false;
    this._currentSelectedObject = null;
    this._currentSelectedPropertiesObject = null;
    this._cameraDepth = 200;
    this._cameraZoomFactor = 200;

    this._cameraZoomFactorForMarker = 0.6; //lower the value the greater the initial zoom will be

    this._augmentId = 0;
    // this._mouseMoveFactor = (this._cameraDepth / 100);
    this._augmentObjects = {};
    this._augmentDimensions = {};
    this._markerHeight = 0;
    this._markerWidth = 0;
    this._posOffset = null;
    this._videoRef = null;
  }


  componentDidMount() {

    // initialize Threejs
    const width = this.editorDiv.clientWidth
    const height = this.editorDiv.clientHeight
    console.log(width, height);

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      90,
      width / height,
      1,
      10000
    )


    const renderer = new THREE.WebGLRenderer({ antialias: true })
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: '#433F81' })
    // const cube = new THREE.Mesh(geometry, material)

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    camera.position.z = this._cameraDepth;
    // scene.add(cube)
    renderer.setClearColor('#ffffff')
    renderer.setSize(width, height)



    // initializing CSS renderer 
    // let renderer2 = new CSS3DRenderer();
    // renderer2.setSize( width, height );
    // renderer2.domElement.style.position = 'absolute';
    // renderer2.domElement.style.top = 0;
    // const cssScene = new THREE.Scene();

    // this.cssScene = cssScene;
    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.material = material
    // this.cube = cube
    this.raycaster = raycaster;
    this.mouse = mouse;

    // this.cssRenderer = renderer2;

    this.addHelperGrid();

    // var controls = new Window.THREE.OrbitControls( camera );
    // controls.update();
    // this.OrbitControls = controls;


    this._augmentObjectsGroup = new THREE.Group();
    this.editorDiv.appendChild(this.renderer.domElement);
    // this.renderer.domElement.appendChild(this.cssRenderer.domElement);
    // this.editorDiv.appendChild(this.cssRenderer.domElement);

    let controls = new TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 1.5;
    controls.noZoom = false;
    controls.noPan = false;
    controls.noRotate = true;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    controls.minDistance = 50
    controls.maxDistance = 10000;
    controls.keys = [68, 83, 65];
    // controls.mouse = {LEFT:THREE.MOUSE.RIGHT, RIGHT:THREE.MOUSE.LEFT};

    // controls.addEventListener( 'change', this.renderScene );
    this.controls = controls;




    // this.addMarkerImage();
    this.initializeEventListners();
    this.start();
    // console.log("canvas mouted");
    // this.initializeAugmentHighLight();

  }

  addHelperGrid = () => {
    let gridColor = new THREE.Color("rgb(219, 219, 219)");
    this.gridHelper = new THREE.GridHelper(10000, 1000, gridColor, gridColor);
    this.gridHelper.geometry.rotateX(Math.PI / 2);
    this.gridHelper.position.z = 1;
    this.scene.add(this.gridHelper);
  }

  onWindowResize = () => {
    this.camera.aspect = this.editorDiv.clientWidth / this.editorDiv.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.editorDiv.clientWidth, this.editorDiv.clientHeight);
    // this.cssRenderer.setSize(this.editorDiv.clientWidth , this.editorDiv.clientHeight);
  }

  initializeEventListners = () => {

    this.editorDiv.addEventListener('mousedown', this.onMouseDown, true);
    this.editorDiv.addEventListener('mouseup', this.onMouseUp, true);
    this.editorDiv.addEventListener('mousemove', this.onMouseMove, true);



    this.scene.add(this._augmentObjectsGroup);
    window.addEventListener('resize', this.onWindowResize, false);
  }
  componentWillUnmount() {
    this.stop();
    this.editorDiv.removeChild(this.renderer.domElement)
    // this.editorDiv.removeChild(this.cssRenderer.domElement)
  }


  //custom functions for manipulating the three
  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop = () => {
    cancelAnimationFrame(this.frameId)
  }

  animate = () => {
    // this.cube.rotation.x += 0.01
    // this.cube.rotation.y += 0.01

    this.controls.update();
    // this.controls.enabled = this._panControlEnabled;
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }


  renderScene = () => {
    // this.OrbitControls.update();
    this.gridHelper.visible = this.props.helperGridStatus;
    this.renderer.render(this.scene, this.camera);
    // this.cssRenderer.render(this.scene, this.camera);
  }



  //function to add images to the canvas



  resetCameraZoomBasedOnMarker = () => {
    console.log("resized");
    this.camera.position.z = this._markerWidth * this._cameraZoomFactorForMarker;
  }

  addMarkerImage = () => {

    var image = document.createElement('img');
    image.crossOrigin = "anonymous";// for handling the CORS error.
    var texture = new THREE.Texture(image);
    image.onload = function () {
      // console.log(image, texture);
      texture.needsUpdate = true;
      let material = new THREE.SpriteMaterial({ map: texture });
      var width = material.map.image.width;
      var height = material.map.image.height;
      // console.log(width, height)
      this._markerHeight = height;
      this._markerWidth = width;
      let sprite = new THREE.Sprite(material);
      sprite.scale.set(width, height, 1);
      sprite.renderOrder = -1;
      this._markerImage = sprite;
      this.scene.add(sprite);
      this.resetCameraZoomBasedOnMarker();
      this.props.onMarkerLoaded();
    }.bind(this)
    // console.log(this.props.markerImage);
    image.src = this.props.markerImage;
    texture.needsUpdate = true;

    //To avoid rescaling of non power of 2 textures by threejs
    texture.generateMipmaps = false;
    texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.minFilter = THREE.LinearFilter;
  }

  // async getDownloadURL (augmentName) {
  //   let sourceURL = null;
  //   console.log(augmentName);
  //   let urlFetchPromise = this._storageRef.ref().child(this.props.sourcePath+"/"+augmentName).getDownloadURL();
  //   // .then((url) => {
  //   //   sourceURL = url;
  //   // },err => {
  //   //   console.log(err.message);
  //   // });
  //   sourceURL = await urlFetchPromise;
  //   console.log(sourceURL);
  //   return sourceURL;
  // }

  createAndAddAugumentAssetHelper = (augmentId, augmentInfoObject, augmentFileData) => {
    let augmentObject = null;
    console.log("augmentFile:", augmentFileData);
    switch (augmentInfoObject.augmentType) {
      case "image":
        augmentObject = this.addSpriteWithImage(augmentFileData, augmentId, augmentInfoObject);
        break;

      // case "video":
      //   augmentObject = this.addSpriteWithVideo(augmentFileData, augmentId, augmentInfoObject);
      //   break;

      // case "unity":
      //   augmentObject = this.add3DAugment(augmentId, augmentInfoObject, augmentInfoObject["offset"]);
      //   break;

      // case "carousel":
      //   augmentObject = this.addCarouselAugment(augmentFileData, augmentId, augmentInfoObject, augmentInfoObject["offset"]);
      //   break;

      default:
        break;
    }
    if (augmentObject !== null) {
      console.log(augmentObject);
      augmentObject.name = augmentId;
      console.log(augmentInfoObject["renderOrder"])
      augmentObject.renderOrder = augmentInfoObject["renderOrder"] ? (augmentInfoObject["renderOrder"] - 1) : (this._augmentObjectsGroup.children.length + 1) * 3 - 1;
      this._markerImage.add(augmentObject);
      this._augmentObjects[augmentId] = augmentObject;
      this._augmentObjectsGroup.add(augmentObject);
      this.setAnchorPoint(augmentId, augmentInfoObject["offset"], augmentInfoObject["augmentType"]);
      this.setXYPos(augmentId, augmentInfoObject["xPos"], augmentInfoObject["yPos"]);
    }
  }

  createAndAddAugumentAsset = (augmentId, augmentInfoObject, augmentFileData, newOrLoad) => {
    // let augmentFileData = augmentInfoObject["sourceURL"];
    // this.getDownloadURL(augmentInfoObject["name"]);
    console.log(newOrLoad);
    let basePath = this.props.sourcePath;
    if (augmentFileData || augmentInfoObject.augmentType === "carousel") {
      this.createAndAddAugumentAssetHelper(augmentId, augmentInfoObject, augmentFileData)
    } else if (augmentInfoObject.augmentType === "unity") {
      let error = null;
      console.log(augmentInfoObject);
      let promiseArray = [];
      // if (augmentInfoObject["androidUnityFileName"]) {
      //   promiseArray.push(this._storageRef.ref().child(basePath + "/" + augmentInfoObject["androidUnityFileName"]).getDownloadURL().then((url) => { }).catch((err) => {
      //     console.log("android file missing");
      //     if (newOrLoad === "Load") { this.props.addThisToFileNotFound(augmentId, augmentInfoObject, "android", null); }
      //     return { error: err };
      //   }));
      // }
      // if (augmentInfoObject["iosUnityFileName"]) {
      //   promiseArray.push(this._storageRef.ref().child(basePath + "/" + augmentInfoObject["iosUnityFileName"]).getDownloadURL().then((url) => { }).catch((err) => {
      //     console.log("ios file missing");
      //     if (newOrLoad === "Load") { this.props.addThisToFileNotFound(augmentId, augmentInfoObject, null, "ios"); }
      //     return { error: err };
      //   }));
      // }
      Promise.all(promiseArray).then((res) => {
        console.log();
        if (newOrLoad === "Load") {
          if (!res[0] && !res[1]) {
            this.createAndAddAugumentAssetHelper(augmentId, augmentInfoObject);
          }
        } else {
          this.createAndAddAugumentAssetHelper(augmentId, augmentInfoObject);
        }
      }).catch((err) => {
        console.log(err);
      })

    } else {
      this._storageRef.ref().child(basePath + "/" + augmentInfoObject["name"]).getDownloadURL()
        .then((url) => {
          console.log(url);
          this.createAndAddAugumentAssetHelper(augmentId, augmentInfoObject, url);
        }).catch((err) => {
          // if (newOrLoad === "Load") { this.props.addThisToFileNotFound(augmentId, augmentInfoObject, null, null); }
        });
    }
  }

  /**
   * For Video Crop Argument changed by Varadharaj 09/25/2019
   */

  modifyVideoScale = (augmentId, argumentProperties) => {
    let cropAttributes = argumentProperties["cropAttributes"];
    // let actualScale = this._augmentDimensions[augmentId];
    // let cropWidthRatio = cropAttributes.width/actualScale.x;
    // let cropHeightRatio = cropAttributes.height/actualScale.y;
    // let augmentObject = this._augmentObjects[augmentId];
    // let width = this._markerWidth * (argumentProperties["scale"]  0.01);
    // let height = width * (actualScale.y / actualScale.x);
    // augmentObject.scale.x = width * cropWidthRatio;
    // augmentObject.scale.y = height * cropHeightRatio;

    let augmentObject = this._augmentObjects[augmentId];
    let width = this._markerWidth * (argumentProperties["scale"] * 0.01);
    let height = width * (cropAttributes.height / cropAttributes.width);
    augmentObject.scale.x = width;
    augmentObject.scale.y = height;
  }

  /*************************************************************************/



  modifyScale = (augmentId, augmentInfoObject) => {
    let scale = augmentInfoObject["scale"];
    let augmentObject = this._augmentObjects[augmentId];
    let actualScale = this._augmentDimensions[augmentId];
    let width = this._markerWidth * (scale * 0.01);
    let height = width * (actualScale.y / actualScale.x);
    let offset = augmentInfoObject["offset"]
    let { xAnchor, yAnchor } = this.getParentOffset(offset)
    let icon = null; let index = 0;
    switch (augmentInfoObject.augmentType) {
      case "video":
        if (augmentInfoObject["cropAttributes"]) {
          this.modifyVideoScale(augmentId, augmentInfoObject);
        } else {
          augmentObject.scale.x = width;
          augmentObject.scale.y = height;
        }
        break;
      case "unity":
        augmentObject.scale.x = this._markerWidth * scale * 0.01;
        augmentObject.scale.y = this._markerWidth * scale * 0.01;
        if (augmentObject.children && augmentObject.children.length > 0) {
          for (let i = 0; i < augmentObject.children.length; i++) {
            if (augmentObject.children[i].name === "unityIcon") {
              icon = augmentObject.children[i]
              index = i
            }
          }
        }
        if (icon) {
          icon.scale.x = 0.25 / (scale * 0.01);
          icon.scale.y = 0.25 / (scale * 0.01);
          icon.center.x = xAnchor
          icon.center.y = yAnchor
          icon.position.x = (icon.scale.x - 1) * (xAnchor - 0.5);
          icon.position.y = (icon.scale.y - 1) * (yAnchor - 0.5);
          augmentObject.children[index] = icon
        }
        break;
      default:
        augmentObject.scale.x = width;
        augmentObject.scale.y = height;
        break;
    }
  }

  setXYPos = (augmentId, xValue, yValue) => {
    let augmentObject = this._augmentObjects[augmentId];
    let xOffset = this._markerWidth * ((xValue * 0.01) + (augmentObject.center.x - 0.5));
    let yOffset = this._markerHeight * ((yValue * 0.01) + (augmentObject.center.y - 0.5));
    augmentObject.position.x = xOffset;
    augmentObject.position.y = yOffset
  }

  modifyXPos = (augmentId, value) => {
    let augmentObject = this._augmentObjects[augmentId];
    let xOffset = this._markerWidth * ((value * 0.01) + (augmentObject.center.x - 0.5));
    augmentObject.position.x = xOffset
  }
  modifyYPos = (augmentId, value) => {
    let augmentObject = this._augmentObjects[augmentId];
    let yOffset = this._markerHeight * ((value * 0.01) + (augmentObject.center.y - 0.5));
    augmentObject.position.y = yOffset
  }

  modifyProperties = (augmentId, property, augmentInfoObject) => {
    switch (property) {
      case "scale":
        this.modifyScale(augmentId, augmentInfoObject);
        break;
      case "xPos":
        this.modifyXPos(augmentId, augmentInfoObject[property]);
        break;
      case "yPos":
        this.modifyYPos(augmentId, augmentInfoObject[property]);
        break;
      case "offset":
        break;
      default:
        break;
    }
  }

  setAnchorPoint = (augmentId, anchorText, augmentType) => {
    let augmentObject = this._augmentObjects[augmentId];
    let { xAnchor, yAnchor } = this.getParentOffset(anchorText);
    augmentObject.center.x = xAnchor;
    augmentObject.center.y = yAnchor;
    augmentObject.position.x = this._markerWidth * (xAnchor - 0.5);
    augmentObject.position.y = this._markerHeight * (yAnchor - 0.5);
    let icon = null; let index = 0; // there can be many children for an augment so index is used to make the code dynamic
    // this code is written for moving the unity/carousel icon on the augment also.
    switch (augmentType) {
      case "unity":
        if (augmentObject.children && augmentObject.children.length > 0) {
          for (let i = 0; i < augmentObject.children.length; i++) {
            if (augmentObject.children[i].name === "unityIcon") {
              icon = augmentObject.children[i]
              index = i
            }
          }
        }
        break;
      case "carousel":
        if (augmentObject.children && augmentObject.children.length > 0) {
          for (let i = 0; i < augmentObject.children.length; i++) {
            if (augmentObject.children[i].name === "carouselIcon") {
              icon = augmentObject.children[i]
              index = i
            }
          }
        }
        break;
      default:
        break;
    }
    if (icon) {
      icon.center.x = xAnchor
      icon.center.y = yAnchor
      icon.position.x = (icon.scale.x - 1) * (xAnchor - 0.5);
      icon.position.y = (icon.scale.y - 1) * (yAnchor - 0.5);
      augmentObject.children[index] = icon
    }
    console.log(augmentObject.children)
    this.setHighlightPos(xAnchor, yAnchor);
  }
  setHighlightPos = (xAnchor, yAnchor) => {
    if (this._highlightLayer) {
      this._highlightLayer.center.x = xAnchor;
      this._highlightLayer.center.y = yAnchor;
      this._highlightLayer.position.x = (this._highlightLayer.scale.x - 1) * (xAnchor - 0.5);
      this._highlightLayer.position.y = (this._highlightLayer.scale.y - 1) * (yAnchor - 0.5);
      this._highlightLayer.position.z = 0;
      if (this._currentSelectedObject) {
        this._highlightLayer.renderOrder = this._currentSelectedObject.renderOrder - 1;
      }

    }
  }

  addSpriteWithImage = (imageData, augmentId, augmentInfoObject) => {
    var texture = new THREE.TextureLoader().load(imageData,
      function (textureLoaded) {
        texture.needsUpdate = true;
        var width = material.map.image.width;
        var height = material.map.image.height;
        sprite.scale.set(width, height, 1);
        this._augmentDimensions[augmentId] = { x: width, y: height };
        this.props.saveAugmentDimension(augmentId, width, height);
        this.modifyScale(augmentId, augmentInfoObject);
        this.highlightNewlyAddedAugment(sprite);
        this._currentSelectedObject = sprite;
      }.bind(this),
      () => { console.log("load failed") });

    //To avoid rescaling of non power of 2 textures by threejs
    texture.generateMipmaps = false;
    texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.minFilter = THREE.LinearFilter;

    var material = new THREE.SpriteMaterial({ map: texture });
    let sprite = new THREE.Sprite(material);
    // sprite.name = "augment"
    // let aug = new THREE.Group().add(sprite);
    // return aug
    return sprite
  }

  // addSpriteWithVideo = (videoData, augmentId, augmentInfoObject) => {
  //   let video = document.createElement('video');
  //   this._videoRef = video;
  //   // video.muted = true;
  //   video.src = videoData;
  //   video.crossOrigin = "anonymous";// for handling the CORS error.
  //   video.load(); // must call after setting/changing source
  //   var texture = new THREE.VideoTexture(video);
  //   texture.minFilter = THREE.LinearFilter;
  //   texture.magFilter = THREE.LinearFilter;
  //   texture.format = THREE.RGBFormat;
  //   video.onloadstart = function () {
  //     console.log("video loading starts");
  //     video.currentTime = 0.001;
  //   }
  //   video.oncanplay = function () {
  //     texture.needsUpdate = true;
  //   }

  //   video.loop = true;
  //   //Crop Texture..
  //   texture.matrixAutoUpdate = false;
  //   var material = new THREE.SpriteMaterial({ map: texture });
  //   let sprite = new THREE.Sprite(material);

  //   video.addEventListener('loadedmetadata', function (e) {
  //     this._augmentDimensions[augmentId] = { x: video.videoWidth, y: video.videoHeight };
  //     this.props.saveAugmentDimension(augmentId, video.videoWidth, video.videoHeight);
  //     this.updateUVforTexture(sprite, augmentInfoObject, video.videoWidth, video.videoHeight);
  //     sprite.scale.set(video.videoWidth, video.videoHeight, 1);
  //     this.modifyScale(augmentId, augmentInfoObject);
  //     this.highlightNewlyAddedAugment(sprite);
  //     this._currentSelectedObject = sprite;
  //   }.bind(this));
  //   // sprite.name = "augment"
  //   // let aug = new THREE.Group().add(sprite);
  //   // return aug;
  //   return sprite
  // }

  onPlayVideo = () => {
    if (this._currentSelectedObject == null) return;
    this._videoRef.play();
  }

  onPauseVideo = () => {
    if (this._currentSelectedObject == null) return;
    this._videoRef.pause();
  }

  onReplayVideo = () => {
    if (this._currentSelectedObject == null) return;
    this._videoRef.currentTime = 0.001;
    if (this._videoRef.currentTime <= 0.001) {
      this._videoRef.play();
    }
  }


  cropVideoArgument = (augmentInfoObject, augmentId) => {
    let actualScale = this._augmentDimensions[augmentId];
    this.updateUVforTexture(this._augmentObjects[augmentId], augmentInfoObject, actualScale.x, actualScale.y);
    this.modifyScale(augmentId, augmentInfoObject);
  }

  updateUVforTexture = (argumentData, augmentInfoObject, videoWidth, videoHeight) => {
    if (!augmentInfoObject["cropAttributes"]) return;

    let cropAttributes = augmentInfoObject["cropAttributes"];
    let xPos = cropAttributes.x / videoWidth;
    let yPos = cropAttributes.y / videoHeight;
    let width = cropAttributes.width / videoWidth;
    let height = cropAttributes.height / videoHeight;
    yPos = 1 - (yPos + height);

    let texture = argumentData.material.map;
    texture.matrix.set(width, 0, xPos, 0, height, yPos, 0, 0, 1);
  }

  getParentOffset = (parentOffset) => {
    let xAnchor = 0;
    let yAnchor = 0;
    switch (parentOffset) {
      case "TopLeft":
        xAnchor = 0;
        yAnchor = 1;
        break;
      case "TopCenter":
        xAnchor = 0.5;
        yAnchor = 1;
        break;
      case "TopRight":
        xAnchor = 1;
        yAnchor = 1;
        break;
      case "CenterLeft":
        xAnchor = 0;
        yAnchor = 0.5;
        break;
      case "Center":
        xAnchor = 0.5;
        yAnchor = 0.5;
        break;
      case "CenterRight":
        xAnchor = 1;
        yAnchor = 0.5;
        break;
      case "BottomLeft":
        xAnchor = 0;
        yAnchor = 0;
        break;
      case "BottomCenter":
        xAnchor = 0.5;
        yAnchor = 0;
        break;
      case "BottomRight":
        xAnchor = 1;
        yAnchor = 0;
        break;
      default:
        break;
    }
    return { xAnchor, yAnchor }
  }

  // addUnityIcon = (unitySprite, parentOffset) => {
  //   var image = document.createElement('img');
  //   image.crossOrigin = "anonymous";// for handling the CORS error.
  //   var texture = new THREE.Texture(image);
  //   let { xAnchor, yAnchor } = this.getParentOffset(parentOffset);
  //   image.onload = function () {
  //     texture.needsUpdate = true;
  //     let material = new THREE.SpriteMaterial({ map: texture });
  //     let sprite = new THREE.Sprite(material);
  //     sprite.renderOrder = unitySprite.renderOrder;
  //     sprite.name = "unityIcon";
  //     unitySprite.add(sprite);
  //     sprite.center.set(xAnchor, yAnchor, 1);
  //     sprite.scale.set(0.25, 0.25, 1);
  //     sprite.position.set((sprite.scale.x - 1) * (xAnchor - 0.5), (sprite.scale.y - 1) * (yAnchor - 0.5), 0);
  //   }
  //   image.src = this.props.iconAssets["unityCanvasIcon"];
  //   texture.needsUpdate = true;

  //   //To avoid rescaling of non power of 2 textures by threejs
  //   texture.generateMipmaps = false;
  //   texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  //   texture.minFilter = THREE.LinearFilter;
  // }

  // addCarouselIcon = (carouselSprite, parentOffset) => {
  //   var image = document.createElement('img');
  //   image.crossOrigin = "anonymous";// for handling the CORS error.
  //   var texture = new THREE.Texture(image);
  //   let { xAnchor, yAnchor } = this.getParentOffset(parentOffset);
  //   image.onload = function () {
  //     // console.log(image, texture);
  //     texture.needsUpdate = true;
  //     let material = new THREE.SpriteMaterial({ map: texture });
  //     this._carouselIconWidth = material.map.image.width * 2;
  //     this._carouselIconHeight = material.map.image.height * 2;
  //     // console.log(width, height)
  //     let sprite = new THREE.Sprite(material);
  //     sprite.renderOrder = carouselSprite.renderOrder;
  //     sprite.name = "carouselIcon";
  //     carouselSprite.add(sprite);
  //     sprite.center.set(xAnchor, yAnchor, 1);
  //     sprite.scale.set((this._carouselIconWidth * 0.1) / carouselSprite.scale.x, (this._carouselIconHeight * 0.1) / carouselSprite.scale.y, 1);
  //     sprite.position.set((sprite.scale.x - 1) * (xAnchor - 0.5), (sprite.scale.y - 1) * (yAnchor - 0.5), 0);
  //   }.bind(this)
  //   // console.log(this.props.markerImage);
  //   image.src = this.props.iconAssets["carouselCanvasIcon"];
  //   texture.needsUpdate = true;


  //   //To avoid rescaling of non power of 2 textures by threejs
  //   texture.generateMipmaps = false;
  //   texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  //   texture.minFilter = THREE.LinearFilter;
  // }

  // addCarouselAugment = (NullParameter, augmentId, augmentInfoObject, parentOffset) => {
  //   //we are not having image data and video data so named first parameter as NullParameter

  //   // console.log(augmentInfoObject);
  //   let carouselWidth = augmentInfoObject["carouselWidth"];
  //   let carouselHeight = augmentInfoObject["carouselHeight"];

  //   this._augmentDimensions[augmentId] = { x: carouselWidth, y: carouselHeight }

  //   var material = new THREE.SpriteMaterial({ color: 0x00ffff });
  //   let sprite = new THREE.Sprite(material);
  //   sprite.scale.x = carouselWidth;
  //   sprite.scale.y = carouselHeight;
  //   sprite.scale.z = 1;
  //   sprite.name = augmentId; // Done here for the next line to work
  //   this.highlightNewlyAddedAugment(sprite);
  //   this.addCarouselIcon(sprite, parentOffset);
  //   // sprite.name = "augment"
  //   // let aug = new THREE.Group().add(sprite);
  //   // return aug;
  //   return sprite
  // }

  // add3DAugment = (augmentId, add3DAugment, parentOffset) => {
  //   this._augmentDimensions[augmentId] = { x: this._markerWidth, y: this._markerWidth }
  //   var material = new THREE.SpriteMaterial({ color: 0xffff00 });
  //   let sprite = new THREE.Sprite(material);
  //   sprite.scale.x = this._markerWidth * add3DAugment["scale"] * 0.01;
  //   sprite.scale.y = this._markerWidth * add3DAugment["scale"] * 0.01;
  //   sprite.scale.z = 1;
  //   sprite.name = augmentId; // Done here for the next line to work
  //   this.highlightNewlyAddedAugment(sprite);
  //   this.addUnityIcon(sprite, parentOffset);

  //   // sprite.name = "augment"
  //   // let aug = new THREE.Group().add(sprite);
  //   // return aug;
  //   return sprite
  // }

  addHighlightLayer = () => {
    if (this._currentSelectedObject == null) return;
    if (this._currentSelectedObject.getObjectByName("Highlight Object") != null) {
      // this.setHighlightPos()
      return;
    }

    if (this._currentSelectedObject !== "video" && this._videoRef) { // if current object is not a video but there is a video augment
      this.onPauseVideo();
    }

    var material = new THREE.SpriteMaterial({ color: "#4396ec" });
    let sprite = new THREE.Sprite(material);
    // sprite.scale.x = width;
    // sprite.scale.y = height;
    // sprite.scale.z = 1;
    let borderThickness = 10;
    var xratio = 1 + (borderThickness / this._currentSelectedObject.scale.x);
    var yratio = 1 + (borderThickness / this._currentSelectedObject.scale.y);
    sprite.scale.set(xratio, yratio, 1);
    sprite.name = "Highlight Object";
    this._currentSelectedObject.add(sprite);
    this._highlightLayer = sprite;
    this.setHighlightPos(this._currentSelectedObject.center.x, this._currentSelectedObject.center.y);
  }

  // modifyCarouselDimension = (augmentId, property, value, parentOffset) => {
  //   // console.log(property, value);
  //   // console.log(this._augmentDimensions[augmentId]);

  //   let augmentObject = this._augmentObjects[augmentId];
  //   let iconObject = augmentObject.getObjectByName("carouselIcon");
  //   let { xAnchor, yAnchor } = this.getParentOffset(parentOffset);

  //   if (property === "carouselWidth") {
  //     this._augmentDimensions[augmentId].x = value;
  //     augmentObject.scale.x = value;
  //     iconObject.scale.x = (this._carouselIconWidth * 0.1) / value;
  //     iconObject.center.x = xAnchor
  //     iconObject.position.x = (iconObject.scale.x - 1) * (xAnchor - 0.5)
  //   }
  //   else if (property === "carouselHeight") {
  //     this._augmentDimensions[augmentId].y = value;
  //     augmentObject.scale.y = value;
  //     iconObject.scale.y = (this._carouselIconHeight * 0.1) / value;
  //     iconObject.center.y = yAnchor
  //     iconObject.position.y = (iconObject.scale.y - 1) * (yAnchor - 0.5)
  //   }
  // }

  setRenderOrder = (augmentId, renderOrder) => {
    this._augmentObjects[augmentId].renderOrder = renderOrder - 1;
    console.log(this._augmentObjects)
    // so its a unity or a carousel augment // this code is to render the unity/carousel icons orderwise
    if (this._augmentObjects[augmentId].children.length > 0) {
      if (this._augmentObjects[augmentId].getObjectByName("carouselIcon")) {
        console.log(renderOrder);
        this._augmentObjects[augmentId].getObjectByName("carouselIcon").renderOrder = renderOrder
      } else if (this._augmentObjects[augmentId].getObjectByName("unityIcon")) {
        this._augmentObjects[augmentId].getObjectByName("unityIcon").renderOrder = renderOrder
      }
    }
    if (augmentId === this._currentSelectedObject.name) {
      this._highlightLayer.renderOrder = renderOrder - 2;
    }
  }

  getAugmentSelected = (intersects) => {
    if (intersects.length === 1) {
      return intersects[0].object;
    }
    else {
      let currentAugmentSelected = intersects[intersects.length - 1].object;
      for (let currentId = intersects.length - 1; currentId > 0; currentId--) {
        if (parseInt(intersects[currentId].distance) === parseInt(intersects[currentId - 1].distance)) {
          currentAugmentSelected = intersects[currentId].object;
          if (intersects[currentId - 1].object.renderOrder > currentAugmentSelected.renderOrder) {
            currentAugmentSelected = intersects[currentId - 1].object;
          }
        }
        else {
          return currentAugmentSelected;
        }
      }
      console.log(currentAugmentSelected.name);
      return currentAugmentSelected;
    }
  }

  highlightNewlyAddedAugment = (newAugmentObject) => {
    this.removeSelectedArgument();
    this._currentSelectedObject = newAugmentObject;
    this.addHighlightLayer();
    this.props.onAugmentChanged(newAugmentObject.name);
  }

  onLeftMouseDown = (event) => {
    console.log("Clicked")
    this._panControlEnabled = false;
    this.removeSelectedArgument();
    let mouse = this.mouse;
    this._isClicked = true;
    mouse.x = (event.offsetX / this.editorDiv.clientWidth) * 2 - 1;
    mouse.y = - (event.offsetY / this.editorDiv.clientHeight) * 2 + 1;
    // console.log(mouse);
    // console.log(this.camera);
    let raycaster = this.raycaster;
    raycaster.setFromCamera(this.mouse, this.camera);
    // calculate objects intersecting the picking ray var intersects =
    let intersects = raycaster.intersectObjects(this._augmentObjectsGroup.children);
    this._currentSelectedObject = intersects.length > 0 ? this.getAugmentSelected(intersects) : null;

    this.props.onAugmentChanged(this._currentSelectedObject ? this._currentSelectedObject.name : null);
    this._currentSelectedObject && (this._currentSelectedPropertiesObject = this._augmentsData[this._currentSelectedObject.name])

    console.log(this._currentSelectedObject)
    if (this._isClicked && this._currentSelectedObject !== null) {
      let camera = this.camera;
      let mouseX = (event.offsetX / this.editorDiv.clientWidth) * 2 - 1;
      let mouseY = - (event.offsetY / this.editorDiv.clientHeight) * 2 + 1;
      let vector = new THREE.Vector3(mouseX, mouseY, 0.5);
      vector.unproject(this.camera);
      console.log(this._currentSelectedObject)
      let dir = vector.sub(this.camera.position).normalize();
      var distance = -camera.position.z / dir.z;
      this._posOffset = camera.position.clone().add(dir.multiplyScalar(distance));
      this._posOffset.subVectors(this._posOffset, this._currentSelectedObject.position);
      // this.addHighlightToAugment();
      this.addHighlightLayer();
    }
  }

  onLeftMouseUp = () => {
    this._isClicked = false;
    this._posOffset = null;
  }

  onMouseDown = (event) => {
    // console.log("mouse down",event);
    switch (event.which) {
      case 1:
        this.onLeftMouseDown(event);
        break;
      case 3:
        // this.onRightMouseDown(event);
        break;
      default:
        break;
    }
  }

  onMouseUp = (event) => {
    // console.log(event);
    switch (event.which) {
      case 1:
        this.onLeftMouseUp(event);
        break;
      case 3:
        // this.onRightMouseUp(event);
        break;
      default:
        break;
    }
  }

  addSelectedArgument = () => {
    if (this._currentSelectedObject == null) return;

    this.addHighlightLayer();
  }

  removeSelectedArgument = () => {
    if (this._currentSelectedObject == null) return;

    if (this._currentSelectedObject.getObjectByName("Highlight Object") != null) {
      this._currentSelectedObject.remove(this._currentSelectedObject.getObjectByName("Highlight Object"));
    }
    // this._currentSelectedObject.position.z = 1;
    this._currentSelectedObject = null;
  }

  calculateXYOffset = (pos) => {
    // console.log(this._currentSelectedObject);
    //for showing the values in the text box
    let xValue = (((pos.x / this._markerWidth) - this._currentSelectedObject.center.x + 0.5) * 100).toFixed(2);
    let yValue = (((pos.y / this._markerHeight) - this._currentSelectedObject.center.y + 0.5) * 100).toFixed(2);
    this.props.onAugmentMoved(xValue, yValue)
  }

  onMouseMove = (event) => {
    if (this._isClicked && this._currentSelectedObject !== null) {
      let camera = this.camera;
      let mouseX = (event.offsetX / this.editorDiv.clientWidth) * 2 - 1;
      let mouseY = - (event.offsetY / this.editorDiv.clientHeight) * 2 + 1;
      let vector = new THREE.Vector3(mouseX, mouseY, 0.5);
      vector.unproject(this.camera);
      let dir = vector.sub(this.camera.position).normalize();
      var distance = -camera.position.z / dir.z;
      var pos = camera.position.clone().add(dir.multiplyScalar(distance));
      if (this._posOffset != null && this._posOffset != NaN)
        pos.subVectors(pos, this._posOffset);
      pos.z = this._currentSelectedObject.position.z;
      this._currentSelectedObject.position.copy(pos);
      // this.setHighlightPos(this._currentSelectedObject.center.x, this._currentSelectedObject.center.y );
      this.calculateXYOffset(pos);
    }
  }



  deleteCurrentSelectedAugement = (augmentId) => {
    let objectToBeRemoved = this._augmentObjects[augmentId];
    this._markerImage.remove(objectToBeRemoved);
    this._augmentObjectsGroup.remove(objectToBeRemoved);
    delete this._augmentObjects[augmentId];
  }

  onZoomInPressed = () => {
    console.log("onZoom in pressed")
    let currentCameraPosition = this.camera.position.z;
    this.camera.position.z = (currentCameraPosition - this._cameraZoomFactor) > 0 ? currentCameraPosition - this._cameraZoomFactor : currentCameraPosition;
  }

  onZoomOutPressed = () => {
    console.log("onZoom out pressed")
    let currentCameraPosition = this.camera.position.z;
    this.camera.position.z = (currentCameraPosition + this._cameraZoomFactor) <= 2500 ? currentCameraPosition + this._cameraZoomFactor : currentCameraPosition;
  }


  render() {
    // console.log(window.innerHeight);
    return (
      <div>
        <div
          // style={{ width: '760px', height: '400px',border: "thin solid red"}}
          style={{ height: '730px', border: "thin solid #4396ec" }}
          ref={(editorDiv) => { if (editorDiv) this.editorDiv = editorDiv }}
        />
      </div>

    )
  }
}

export default ARCanvasEditor;
