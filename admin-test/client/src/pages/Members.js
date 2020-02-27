import React, { Component } from "react";
import axios from 'axios';
// import DeleteButton from "../components/DeleteButton/DeleteButton"
import List from "../components/List/List";
import ListItem from "../components/List/ListItem";
// import orm from "../../config/orm";
// var members
class Members extends Component {
  // state = {
  //   members: []
  constructor(props) {
    super(props);
    this.state={
      members: [],
      id: ""
    }
  
  };

  componentDidMount() {
    this.loadMembers();
    // fetch('/members')
    // .then(res => res.json())
    // .then(allmembers_ => this.setState({members: allmembers_}, () => console.log(allmembers_)))
  };

  loadMembers = () => {
    axios.get('/members')
      .then((response) => {
        console.log(response)
        this.setState({members: response.data.members})
      })
  };

  // deleteMember = id => {
  //   axios.delete(id)
  //     .then(res => this.loadMembers())
  //     .catch(err => console.log(err));
  // };

  deleteMember = (e,data) => {
    e.preventDefault();
    axios.delete(`members/id/${data}`)
      .then(res => this.loadMembers())
      .catch(err => console.log(err));
  };

  // handleDelete = e => {
  //   this.setState({ id: e.target.value});
  // }

  renderMember = () => {
    return this.state.members.map(member => (
      <div key={member.id}>
        {member.firstName}
      </div>
    ))
  }




  render() {
    return (
      <div>
        <h1>Hello Members</h1>
        {/* {this.renderMember()} */}

        {this.state.members.length ? (
              <List>
                {this.state.members.map(member => {
                  return (
                    <ListItem 
                    key={member.id}>
                      {/* <a href={"/members/:id" + member.id}> */}
                        <strong>
                          {member.firstName} {member.lastName} {member.username}
                          {member.password} {member.phoneNum} {member.bday} 
                          {member.address} {member.email} {member.emergName}
                          {member.emergNum}
                        </strong>
                      {/* </a> */}
                      <button type="submit" onClick={e => this.deleteMember(e, member.id)}>Delete</button>
                      {/* <DeleteButton onClick={() => this.deleteMember(member.id)} /> */}
                      {/* <DeleteButton onClick={this.deleteMember} /> */}
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
        {/* <ol>
                {console.log(members)}
              </ol> */}
        {/* {this.state.members.length ? (
              <List>
                {this.state.members.map(member => (
                  <ListItem key={member.id}>
                    <a href={"/members/" + member.id}>
                      <strong>
                        {member.firstName} {member.lastName}
                      </strong>
                    </a>
                    <DeleteBtn />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )} */}

      </div>
    )
  }
}
export default Members;


      // loadMembers = () => {
      //   fetch('/members')
      //   .then(response => response.json())
      //   .then(members => {
      //     (this.setState({members}))
      //   console.log('hello');
      //   }
      //   )}

      // loadMembers = () => {
      //   fetch('/members')
      //     .then(res => this.setState({ members: res.data }))
      //     .catch(err => console.log(err));
      // };


      // loadMembers = () => {
      //   orm.allMembers()
      //     .then(res => this.setState({ members: res.data }))
      //     .catch(err => console.log(err));
      // };