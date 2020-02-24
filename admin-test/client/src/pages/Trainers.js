import React, { Component } from "react";
import axios from 'axios';
import Input from '../components/Form/Input';
// import TextArea from '../components/Form/TextArea';
import FormButton from '../components/Form/FormButton'

class Trainers extends Component {
    constructor(props) {
        super(props);
        this.state={
            trainers: [],
            // id: "",
            // trainerFirstName: "",
            trainerLastName: ""
        }
    };

    componentDidMount() {
        this.loadTrainers();
    }

    loadTrainers = () => {
        axios.get('/trainers')
          .then((response) => {
            console.log(response)
            this.setState({trainers: response.data.trainers})
          })
      };

    renderTrainer = () => {
        return this.state.trainers.map(trainer => (
          <div key={trainer.id}>
            {trainer.trainerFirstName} {trainer.trainerLastName}
          </div>
        ))
      };

      handleInputChange = event => {
        event.preventDefault();
        if (this.state.trainerFirstName && this.state.trainerLastName) {
        //   API.saveBook({
        //     title: this.state.title,
        //     author: this.state.author,
        //     synopsis: this.state.synopsis
        //   })
        axios.post(`/addtrainers${this.state.id}`)
        .then(res => this.loadTrainers())
        .catch(err => console.log(err));
            // .then(res => this.loadBooks())
            // .catch(err => console.log(err));
        }
      };

    // handleInputChange = event => {
    //     this.setState({ trainerLastName: event.target.value });
    //   };


      handleFormSubmit = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
     
      };

    // handleFormSubmit = event => {
    //     event.preventDefault();

    //     const newTrainer = { trainerLastName: this.state.trainerLastName };

    //     axios.post(`trainers`, { newTrainer})
    //     .then(res => {
    //         console.log(res);
    //         console.log(res.data);
    //     })
    // }

    render() {
        return (
            <div>
                 <h1>Trainers</h1>
        {this.renderTrainer()}

        {/* <form onSubmit={this.handleFormSubmit}>
            <label>
                First Name:
                <input type="text" name="name" onChange={this.handleInputChange}></input>
            </label>
            <button type="submit">Add Trainer</button>
            </form> */}
            <form>
              <Input
                // value={this.state.trainerFirstName}
                defaultValue=""
                onChange={this.handleInputChange}
                name="First Name"
                placeholder="First Name (required)"
              />
              <Input
                // value={this.state.trainerFirstName}
                defaultValue=""
                onChange={this.handleInputChange}
                name="Last Name"
                placeholder="Last Name (required)"
              />
              <FormButton
                // disabled={!(this.state.trainerFirstName && this.state.trainerLastName)}
                onClick={this.handleFormSubmit}
              >
                Add Trainer
              </FormButton>
            </form>
            </div>
        )
    }
}
export default Trainers;