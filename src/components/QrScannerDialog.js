import {
  Dialog,
  DialogContent,
  Box,
  Button
} from '@mui/material';
import QrScanner from './QrScanner';
import QrLogs from './QrLogs';

export default (props) => {

  const {
    open      ,
    onClose   ,
    logs      ,
    setStatus ,
  } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}>
      <DialogContent>
        <QrScanner setStatus={setStatus}/>
        <QrLogs logs={logs}/>
      </DialogContent>
    </Dialog>
  );
};
