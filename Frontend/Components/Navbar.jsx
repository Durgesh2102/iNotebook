


import React, {useEffect, useState } from 'react';



const Navbar = () => {

  // ... (other context and state variables)

  const [isNavbarFixed, setIsNavbarFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsNavbarFixed(true);
      } else {
        setIsNavbarFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // ... (rest of the component)

  return (
    <>
      <nav className={`navbar  navbar-expand-lg ${isNavbarFixed ? 'fixed-top' : ''}`}>
      <div className="container-fluid ">
                    <button className="btn border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" style={{ padding: "auto" }}>
                        <i className="fa-solid fa-bars"></i>
                    </button>
                    <img src="https://play-lh.googleusercontent.com/9bJoeaPbGTB8Tz_h4N-p-6ReRd8vSS-frZb2tmJulaGIoTKElKj3zpmcFJvnS96ANZP5" className="rounded float-start" alt="..." style={{ width: "40px", height: "40px" }}></img>
                 
                    <button className="navbar-toggler mb-3 " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>


                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="d-flex justify-content-between align-items-center" style={{ width: '100%' }}>
                            <div className='  ms-3  '>
                               
                            </div>
                            {localStorage.getItem('token') && (
                                <button
                                    type="button"
                                    className="border-0 justify-content-center align-items-center rounded-circle me-3"
                                    data-bs-toggle="modal"
                                    data-bs-target="#secondModal"
                                    style={{ width: 'auto', height: 'auto', padding: '0' }}
                                >
                                    <img
                                        src="https://w7.pngwing.com/pngs/802/786/png-transparent-google-account-google-search-customer-service-google-logo-login-button-blue-sphere-car-rental-thumbnail.png"
                                        className="rounded-circle"
                                        width={'30px'}
                                        height={'30px'}
                                        alt="Profile"
                                    />
                                </button>
                            )}
                        </div>
                    </div>

                </div>
      </nav>
    </>
  );
};

export default Navbar;
