import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from '@mui/material';

function DeleteUserDialog(props){

  const {
    open,
    onClose,
    id
  } = props;

  const {
    users,
    axios,
    axiosErrorHandling,
    navigate,
    _
  } = window.web;

  const user = users[id];

  const del = e => {
    axios({
      url : 'user/delete/' + id,
      method : 'POST',
    }).then(r => {
      delete users[id];
      navigate('/attendance-list');
    }).catch(axiosErrorHandling)
  };

  if(!user)
    return <></>;

  return (

    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth>

      <DialogTitle>
        {_('delete_user_title')}
      </DialogTitle>

      <DialogContent>

        {
          user.is_student ?
          _('msg_delete_student', user) :
          _('msg_delete_teacher', user)
        }

      </DialogContent>

      <DialogActions>

        <Button
          variant="text"
          onClick={onClose}
          children={_('lbl_cancel')}/>

        <Button
          variant="text"
          onClick={del}
          children={_('lbl_delete')}
          color="error"/>

      </DialogActions>

    </Dialog>

  );
}

export default DeleteUserDialog;