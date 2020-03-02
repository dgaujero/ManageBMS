import React, { Component } from "react";
import axios from 'axios';
import fire from '../fire'
//import NavTabs?
// might need cols and rows

// var checkedIn

class Attendance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedIn: []
        }

    };

    componentDidMount() {
        this.loadCheckedInMembers();
    };

    loadCheckedInMembers = () => {
        axios.get('/attendance')
            .then((response) => {
                console.log(response)
                this.setState({ checkedIn: response.data.checkedIn })
            })

    }
    renderCheckedIn = () => {
        return this.state.checkedIn.map(member => (
          <div key={member.id}>
            {member.name}
            { member.purpose }
            { member.timestamp }
          </div>
        ))
      }

      
      logout = () => {
        fire.auth().signOut();
       
    }
    

      render() {
        return (
            <div>

                Checked In Members: {this.renderCheckedIn()}

                <button type ="submit" href="" onClick={this.logout}>Sign Out</button>
    
            </div>
        )
    }
    }


// function Attendance() {
//     return (
//         <div>
//             <h1>Class Attendance</h1>
//         </div>
//     )
// }

export default Attendance
















