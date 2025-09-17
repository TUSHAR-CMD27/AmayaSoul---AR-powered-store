import React from 'react';
import '@google/model-viewer';


const Product3DViewer = ({ modelSrc, altText }) => {
  return (
    <model-viewer
      src='/public/models/majesty_palm_plant/scene.gltf'          
      alt="Plant 3d model"              // accessibility text
      ar                           // enables AR
      ar-modes="webxr scene-viewer quick-look"  // supports mobile AR
      camera-controls              // rotate/zoom
      auto-rotate                  // slowly rotate by default
      environment-image="neutral"  // optional, simple lighting
      shadow-intensity="1"         // optional
      style={{ width: '100%', height: '400px' }}
      loading="lazy"               // loads when in view
    ></model-viewer>
  );
};

export default Product3DViewer;
