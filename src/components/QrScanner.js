import {useRef, useEffect} from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Button
} from '@mui/material';
import QrReader from 'react-qr-scanner';

export default (props) => {

  const {setStatus} = props;

  const {users, _} = window.web;

  const logsRef = useRef(null);

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