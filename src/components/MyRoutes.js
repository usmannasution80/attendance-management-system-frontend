import Login from './Login';
import AttendanceList from './AttendanceList';
import EditPerson from './EditPerson';
import DownloadCards from './DownloadCards';
import ChangeLanguage from './ChangeLanguage';
import Menu from './Menu';

export default () => {

  return (
    <Routes>
      <Route path="/" element={<AttendanceList/>}/>
      <Route path="/attendance-list" element={<AttendanceList/>}/>
      <Route path="/edit-person/:user_id" element={<EditPerson/>}/>
      <Route path="/add-person" element={<EditPerson/>}/>
      <Route path="/download-cards" element={<DownloadCards/>}/>
      <Route path="/change-language" element={<ChangeLanguage/>}/>
    </Routes>
  );

};
