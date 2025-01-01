import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NameFileUploadScreen from '../Screens/NameFileUploadScreen';
function MainRouter() {


  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<NameFileUploadScreen/>} />
          <Route path="/files" element={<NameFileUploadScreen/>} />
        </Routes>
      </Router>
    </div>
  );
}
export default MainRouter;

