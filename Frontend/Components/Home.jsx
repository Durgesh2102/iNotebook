// import React, { useEffect, useRef } from 'react';
// import { Routes, Route, Link } from 'react-router-dom';

// import Navbar from './Navbar';
// import ModalBrowser from './profile Modal/ModalBrowser';
// import RightSideBar from './note/RightSideBar';
// import Alert from './Alert';
// import AddNotesModal from './note/AddNotesModal';
// import ListNote from './ListNote';
// import backgroundImage from './image/notebook-blur.png';
// import Archive from './Archive';

// const Home = () => {
//   const containerRef = useRef(null);

//   const measureContainer = () => {
//     if (containerRef.current) {
//       const { width, height } = containerRef.current.getBoundingClientRect();
//       console.log('Width:', width, 'Height:', height);
//     }
//   };

//   useEffect(() => {
//     measureContainer();
//   });

//   return (
//     <div
//       ref={containerRef}
//       id="homeContainer"
//       style={{
//         height: '100vh',
//         backgroundImage: `url(${backgroundImage})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       }}
//     >
//       <div>
//         <Navbar />
//         <ModalBrowser />
//         <RightSideBar />
//         <AddNotesModal />
//         <Alert />
//         <ListNote />

//         {/* The Archive button uses a Link to navigate to the /archive route */}
//         <Link to="/archive" className="btn btn-primary" role="button">
//           Archive Button
//         </Link>

//         {/* <Routes>
         
//         </Routes> */}
//       </div>
//     </div>
//   );
// };

// export default Home;


import React, { useEffect, useRef } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Import your components...
import Navbar from './Navbar';
import ModalBrowser from './profile Modal/ModalBrowser';
import RightSideBar from './note/RightSideBar';
import Alert from './Alert';
import AddNotesModal from './note/AddNotesModal';
import ListNote from './ListNote';
import backgroundImage from './image/notebook-blur.png';
import Archive from './Archive';
import DemoModal from './DemoModal';

const Home = () => {
  return (
    <div
      style={{
        height: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div>
        <Navbar />
        <AddNotesModal />
        <Alert />
        <ListNote />
      </div>
    </div>
  );
};

export default Home;

