import {useRef, useEffect} from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Button
} from '@mui/material';
import QrReader from 'react-qr-scanner';

export default (props) => {

  const {
    open      ,
    onClose   ,
    logs      ,
    setStatus ,
  } = props;

  const {
    users ,
    _     ,
  } = window.web;

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

  useEffect(() => {

    if(logsRef.current)
      logsRef.current.scrollTop = logsRef.current.scrollHeight;

  });

  return (
    <Dialog
      open={open}
      onClose={onClose}>
      <DialogContent>
        <QrReader
          style={{width:"100%"}}
          onError={e => console.log(e)}
          onScan={onScan}
          constraints={constraints}/>
        <Box
          sx={{overflow:'scroll', maxHeight:'5em'}}
          ref={logsRef}>
          {(() => {
            const logDivs = [];
            for(let log of logs){
              const [time, color, text] = log.split(',');
              logDivs.push(
                <div style={{color, whiteSpace:'nowrap'}}>
                  {time} : {text}
                </div>
              );
            }
            return logDivs;
          })()}
        </Box>
      </DialogContent>
    </Dialog>
  );
}