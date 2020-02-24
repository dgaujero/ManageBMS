// import React from "react";

// function App() {
//   return (
//     <div>
//       {/* <Nav />
//       <Books /> */}
//     </div>
//   );
// }

// export default App;


// on initial page load, show class attendance. WORKING
// need component for class attendance
// need component for members
// need component for trainers
// need component for scheduler
// for members, need to display list of members and route to delete
// for trainers, need to CRUD trainers-- display, add, update, delete-- and assign to classes
// for scheduler, need to CRUD classes-- display, add, update, delete. 

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavTabs from "./components/Navbar";
import Members from "./pages/Members";
import Attendance from "./pages/Attendance";
import Scheduler from "./pages/Scheduler";
import Trainers from "./pages/Trainers";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Wrapper from "./components/Wrapper";

function App() {
  return (
    <Router>
      <div className = "management">
        {/* <Navbar />
        <Wrapper> */}
        <NavTabs />
          <Route exact path="/" component={Attendance} />
          <Route exact path="/attendance" component={Attendance} />
          <Route exact path="/members" component={Members} />
          <Route exact path="/scheduler" component={Scheduler} />
          <Route exact path="/trainers" component={Trainers} />
        {/* </Wrapper>
        <Footer /> */}
      </div>
    </Router>
  );
}

export default App;