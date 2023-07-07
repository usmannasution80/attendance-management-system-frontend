import {Routes, Route, useLocation} from 'react-router-dom';
import {useEffect} from 'react';
import Login from './Login';
import AttendanceList from './AttendanceList';
import EditPerson from './EditPerson';
import Menu from './Menu';

export default () => {

  return (
    <Routes>
      <Route path="/" element={<AttendanceList/>}/>
      <Route path="/attendance-list" element={<AttendanceList/>}/>
      <Route path="/edit-person" element={<EditPerson edit/>}/>
      <Route path="/add-person" element={<EditPerson/>}/>
    </Routes>
  );

};