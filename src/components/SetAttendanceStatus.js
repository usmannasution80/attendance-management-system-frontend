import {
  Dialog,
  Box,
  DialogContent,
  Button
} from '@mui/material';

function SetAttendanceStatus(props){

  const {
    open      ,
    onClose   ,
    userId    ,
    date      ,
    setStatus ,
  } = props;

  const {
    users  ,
    axios  ,
    render ,
    _
  } = window.web;

  if(!open)
    return <></>;

  const user = users[userId];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      onClick={onClose}
      fullWidth>

      <DialogContent>

        <table border="0">
          <tbody>
            <tr>
              <td>{_('lbl_name')}</td>
              <td>:</td>
              <td>{user.name}</td>
            </tr>
          </tbody>
        </table>
  
        <Box>
          {(() => {
    
            let statuses = {
              absent  : 'error'   ,
              excuse  : 'primary' ,
              sick    : 'warning' ,
              present : 'success'
            }
            let buttons = [];
    
            for(let status in statuses){
              buttons.push(
                <Button
                  fullWidth
                  color={statuses[status]}
                  children={_(status)}
                  onClick={e => setStatus(userId, status)}
                  sx={{mb:1}}/>
              );
            }
  
            return buttons;
  
          })()}
        </Box>

      </DialogContent>

    </Dialog>
  );
}

export default SetAttendanceStatus;