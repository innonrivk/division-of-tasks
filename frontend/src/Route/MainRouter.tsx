import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function MainRouter(props) {


  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<>asdc</>} />
          <Route path="/files" element={<>sdas</>} />
        </Routes>
      </Router>
    </div>
  );
}
export default MainRouter;

