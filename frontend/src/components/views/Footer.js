import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const Footer = () => {
  return (
     
    <MDBFooter color="rare-wind-gradient" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title text-dark">CS5610 Final Project</h5>
          </MDBCol>
          <MDBCol md="6" >
            <h5 className="title text-dark">Contributer</h5>
            <p>
              <li className="list-unstyled text-dark">
                Anda Luo
              </li>
              <li className="list-unstyled text-dark">
                Nuoyu Yang
              </li>
              <li className="list-unstyled text-dark">
                Siyu Lyu
              </li>
            </p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3" >
        <MDBContainer fluid >
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.northeastern.edu/seattle/" className="text-dark"> Northeastern University </a>
        </MDBContainer>
      </div>
    </MDBFooter>
    
  );
}

export default Footer;