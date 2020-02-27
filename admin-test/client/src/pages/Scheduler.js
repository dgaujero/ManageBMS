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
            nameOfClass: ""
        }
    };

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

    renderClasses = () => {
        return this.state.classes.map(classList => (
            <div key={classList.id}>
                {classList.nameOfClass} {classList.classType}
            </div>
        ))
    };

    handleInputChange = (event, data) => {
        // e.preventDefault();
        this.setState({nameOfClass: event.target.value});
      };
      
      handleFormSubmit = event => {
          event.preventDefault();
          
          const addClass= { 
              nameOfClass: this.state.nameOfClass
            };
            console.log(addClass.nameOfClass);
        
        axios.post(`scheduler/add`, { addClass })
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
      }

      updateClass = (e,data) => {
        e.preventDefault();
        const updateClass = {
            nameOfClass: this.state.nameOfClass
        }
        axios.put(`scheduler/id/${data}`, updateClass)
          .then(res => this.loadClasses())
          .catch(err => console.log(err));
      };

        //   handleInputChange = event => {
    //       this.setState({ nameOfClass: event.target.value})
    //   }

      
    //   handleFormSubmit = event => {
    //       event.preventDefault();
    //     const { name, value } = event.target;
    //     this.setState({
    //       [name]: value
    //     });
     
    //   };



    render() {
        return (
            <div>
                <h1>Classes</h1>
                {this.renderClasses()}

                <form>
              <Input
                // value={this.state.className}
                defaultValue=""
                onChange={this.handleInputChange}
                name="Class Name"
                placeholder="Class Name (required)"
              />
              {/* <Input
                // value={this.state.className}
                defaultValue=""
                onChange={this.handleInputChange}
                name="Class Type"
                placeholder="Class Type (required)"
              /> */}
              <FormButton
                // disabled={!(this.state.className)}
                onClick={this.handleFormSubmit}
              >
                Add Class
              </FormButton>
            </form>

            {/* <form onSubmit={this.handleFormSubmit}>
                <label>
                    Add Class:
                    <input type="text" name="name" onChange={this.handleInputChange} />
                </label>
                <button type ="submit">Add Class</button>
            </form> */}

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
                      {/* </a> */}
                      <ModalTemplate id={classUpdate.id} updateClass={this.updateClass}/>
                      <button type="submit" onClick={e => this.updateClass(e, classUpdate.id)}>Update Class</button>
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