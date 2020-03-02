import React from 'react';
import Home from "../src/pages/Home"
import { BrowserRouter as Router, Route } from "react-router-dom";
// import { Button, Form, FormGroup, Label, Input, FormText, Container, Col } from 'reactstrap';
// import fire from "../fire"
// import App from "../App"


function Homepage() {
    return (
      <Router>
        <div className = "homepage">
          {/* <Navbar />
          <Wrapper> */}
          {/* <NavTabs /> */}
           
          <Route exact path="/" component={Home} />
          {/* </Wrapper>
          <Footer /> */}
        </div>
      </Router>
    );
  }
  
  export default Homepage;