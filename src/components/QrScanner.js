import {useRef, useEffect} from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Button
} from '@mui/material';
import jsQR from 'jsqr';

function QrScanner(){

  const {users, _, component, axios} = window.web;
  const setStatus = component('AttendanceList', 'setStatus') || (() => 0);

  const constraints = {
    video : {
      facingMode : {
        ideal : 'environment'
      }
    }
  };

  const video = useRef(null);
  const canvas = useRef(null);
  const scanTimeout = useRef(null);
  const scanInterval = 100;
  const i = useRef(0);

  const scan = () => {
    if(scanTimeout.current){
      clearTimeout(scanTimeout.current);
      scanTimeout.current = null;
    }
    if(canvas.current && video.current){
      
      const width = video.current.videoWidth || 10;
      const height = video.current.videoHeight || 10;

      canvas.current.width = width;
      canvas.current.height = height;

      const context = canvas.current.getContext('2d');
      context.imageSmoothingEnabled = false;
      context.drawImage(video.current, 0, 0, width, height);

      const imageData = context.getImageData(0, 0, width, height);
      const result = jsQR(imageData.data, width, height);
      
      if(result){

        const id = result.data;

        if(users[id])
          setStatus(id, 'present', true);

      }

    }
    
    scanTimeout.current = setTimeout(scan, scanInterval);
  };

  useEffect(() => {
    if(video.current){
      navigator
      .mediaDevices
      .getUserMedia(constraints)
      .then(stream => {
        video.current.srcObject = stream;
        video.current.onloadedmetadata = e => {
          video.current.play();
        }
      });
    }
    scanTimeout.current = setTimeout(scan, scanInterval);
  }, []);

  return (
    <>
      <video
        ref={video}
        width="100%"/>
      <div style={{height:'0px', overflow:'hidden'}}>
        <canvas ref={canvas}></canvas>
      </div>
    </>
  );
}

export default QrScanner;