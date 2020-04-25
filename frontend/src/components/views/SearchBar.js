import React from "react";
import { MDBCol, MDBFormInline, MDBBtn } from "mdbreact";

const SearchBar = () => {
  return (
    <MDBCol md="12">
      {/* <MDBFormInline className="md-form mr-auto mb-4">
        <input className="form-control mr-sm-2" type="text" placeholder="Keywords" aria-label="Search" />
        <MDBBtn outline gradient="near-moon-gradient" rounded size="sm" type="submit" className="mr-auto">
          Search
        </MDBBtn>
      </MDBFormInline> */}
      <MDBFormInline className="md-form mr-auto m-0">
                <input className="form-control mr-sm-2" type="text" placeholder="Search for Keywords" aria-label="Search" />
                <MDBBtn outline color="aqua-gradient" size="sm" type="submit" className="mr-auto">
                  Search
                </MDBBtn>
    </MDBFormInline>
    </MDBCol>
  );
}

export default SearchBar;
