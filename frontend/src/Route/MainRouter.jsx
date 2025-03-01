import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NameFileUploadScreen from '../Screens/NameFileUploadScreen';
import HomePage from '../Screens/HomePage';
import MissionUploadScreen from '../Screens/MissionUploadScreen';
function MainRouter() {


  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/files" element={<NameFileUploadScreen isUpdateFile={false}/>} />
          <Route path="/mission" element={<MissionUploadScreen/>} />
          <Route path="/updated-files" element={<NameFileUploadScreen isUpdateFile={true}/>} />
        </Routes>
      </Router>
    </div>
  );
}
export default MainRouter;

