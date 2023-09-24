import {useState} from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Button
} from '@mui/material';
import QrScanner from './QrScanner';
import QrLogs from './QrLogs';

function QrScannerDialog(){

  const {component} = window.web;
  const [render, setRender] = useState(-1);
  component('QrScannerDialog', 'render', () => setRender(render * -1), false);

  return (
    <Dialog
      open={component('QrScannerDialog', 'open')}
      onClose={e => component('QrScannerDialog', 'open', false)}>
      <DialogContent>
        <QrScanner/>
        <QrLogs/>
      </DialogContent>
    </Dialog>
  );
}

export default QrScannerDialog;