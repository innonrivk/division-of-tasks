import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NameFileUploadScreen from '../Screens/NameFileUploadScreen';
import HomePage from '../Screens/HomePage';
function MainRouter() {


  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/files" element={<NameFileUploadScreen/>} />
        </Routes>
      </Router>
    </div>
  );
}
export default MainRouter;

