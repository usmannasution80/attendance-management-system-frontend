import {useRef, useEffect} from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Button
} from '@mui/material';
import QrReader from 'react-qr-scanner';

function QrScanner(){

  const {users, _, component} = window.web;
  const setStatus = component('AttendanceList', 'setStatus') || (() => 0);

  const constraints = {
    video : {
      facingMode : {
        ideal : 'environment'
      }
    }
  };

  const onScan = r => {

    if(!r)
      return;

    const id = r.text;

    if(!users[id])
      return;

    setStatus(id, 'present', true);

  }

  return (
    <QrReader
      style={{width:"100%"}}
      onError={e => console.log(e)}
      onScan={onScan}
      constraints={constraints}/>
  );
}

export default QrScanner;