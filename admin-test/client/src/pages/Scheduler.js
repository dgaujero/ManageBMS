import React, { Component } from "react";
import axios from 'axios';
import Input from '../components/Form/Input'
import FormButton from '../components/Form/FormButton'
import List from '../components/List/List'
import ListItem from '../components/List/ListItem'
import ModalTemplate from '../components/Modal/Modal'

class Scheduler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      nameOfClass: "",
      classToEdit: "",
      typeToEdit: "", //add
      trainerToEdit: "", //add
      sizeToEdit: "", //add
      classType: "",
      assignedTrainer: "",
      classSize: ""
    }
  };

  componentDidUpdate() {
    console.log("new state", this.state)
  }

  componentDidMount() {
    this.loadClasses();
  }

  loadClasses = () => {
    axios.get('/scheduler')
      .then((response) => {
        console.log(response)
        this.setState({ classes: response.data.classes })
      })
  };

  deleteClass = (e,data) => {
    e.preventDefault();
    axios.delete(`scheduler/id/${data}`)
      .then(res => this.loadClasses())
      .catch(err => console.log(err));
  };


  renderClasses = () => {
    return this.state.classes.map(classList => (
      <div key={classList.id}>
        {classList.nameOfClass} {classList.classType}
        {classList.assignedTrainer} {classList.classSize}
      </div>
    ))
  };

  handleInputChange = (event, data) => {
    console.log(event)
    const { name, value } = event.target
    this.setState({ [name]: value });
  };

  handleInputChangeToo = (event) => {
    console.log(event)
    const { name, value, name1, value1 } = event.target

    this.setState({ [name]: value, [name1]: value1 });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    const addClass = {
      nameOfClass: this.state.nameOfClass,
      classType: this.state.classType,
      assignedTrainer: this.state.assignedTrainer,
      classSize: this.state.classSize
    };
    console.log(addClass.nameOfClass);
    console.log(addClass.classType)

    axios.post(`scheduler/add`, { addClass })
      .then(res => {
        this.loadClasses();

        console.log(res);
        console.log(res.data);
      })
  }

  updateClass = (e, data) => {
    e.preventDefault();

    console.log(this.state.classToEdit)
    console.log(this.state.typeToEdit)
    console.log(this.state.classSize)
    const updateClass = {
      nameOfClass: this.state.classToEdit,
      typeOfClass: this.state.typeToEdit, //add
      assignedTrainer: this.state.trainerToEdit, //add
      classSize: parseInt(this.state.sizeToEdit) //add
    }
    axios.put(`scheduler/id/${data}`, updateClass)
      .then(res => {
        this.setState({ classToEdit: '', typeToEdit: '', trainerToEdit: '', sizeToEdit: '' }) //added last 3
        this.loadClasses()
      }
      )
      .catch(err => console.log(err));
  };




  render() {
    return (
      <div>
        <h1>Classes</h1>
        {/* {this.renderClasses()} */}

        <form>
          <Input

            // defaultValue=""
            value = {this.state.nameOfClass}
            onChange={this.handleInputChange}
            name="nameOfClass"
            placeholder="Class Name (required)"
          />

          <Input

            // defaultValue=""
            value = {this.state.classType}
            onChange={this.handleInputChange}
            name="classType"
            placeholder="Class Type (required)"
          />
          <Input
              
              // defaultValue=""
              value = {this.state.assignedTrainer}
              onChange={this.handleInputChange}
              name="assignedTrainer"
              placeholder="Assigned Trainer (required)"
            />
            <Input
              
              // defaultValue=""
              value={this.state.classSize}
              onChange={this.handleInputChange}
              name="classSize"
              placeholder="Class Size (required)"
            />

          <FormButton

            onClick={this.handleFormSubmit}
          >
            Add Class
              </FormButton>
        </form>


        <List>
          {this.state.classes.map(classUpdate => {
            return (
              <ListItem
                key={classUpdate.id}>
                {/* <a href={"/members/:id" + member.id}> */}
                <strong>
                  {classUpdate.nameOfClass} {classUpdate.classType}
                  {classUpdate.assignedTrainer} {classUpdate.classSize}
                </strong>

                <button type="submit" onClick={e => this.deleteClass(e, classUpdate.id)}>Delete</button>
                {/* </a> */}
                <ModalTemplate value={this.state.classToEdit} statename="classToEdit" id={classUpdate.id} 
                updateClass={this.updateClass} changeFunction={this.handleInputChangeToo} name={classUpdate.nameOfClass}
                value1 ={this.state.typeToEdit} statename1="typeToEdit" id1={classUpdate.id} updateClass1={this.updateClass} changeFunction1={this.handleInputChangeToo}
                name1={classUpdate.classType}
                value2 ={this.state.trainerToEdit} statename2="trainerToEdit" id2={classUpdate.id} updateClass2={this.updateClass} changeFunction2={this.handleInputChangeToo}
                name2={classUpdate.assignedTrainer}
                value3 ={this.state.sizeToEdit} statename3="sizeToEdit" id3={classUpdate.id} updateClass3={this.updateClass} changeFunction3={this.handleInputChangeToo}
                name3={classUpdate.classSize}
                 />
                {/* <button type="submit" onClick={e => this.updateClass(e, classUpdate.id)}>Update Class</button> */}
                {/* <DeleteButton onClick={() => this.deleteMember(member.id)} /> */}
                {/* <DeleteButton onClick={this.deleteMember} /> */}
              </ListItem>
            );
          })}
        </List>

      </div>
    )
  }
}
export default Scheduler;

