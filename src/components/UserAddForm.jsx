import React from 'react';
import './UserAddForm.css';

const initialState = {
    name: '',
    email: '',
    isGoldClient: false,
    salary: '',
    image: null,
    nameError: '',
    emailError: ''
};

class UserAddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    updateName(event) {
        this.setState({name: event.target.value});
    }

    updateEmail(event) {
        this.setState({email: event.target.value});
    }

    updateIsGoldClient(event) {
        this.setState({isGoldClient: event.target.checked});
    }
    
    updateSalary(event) {
        this.setState({salary: event.target.value});
    }
    updateImage(event) {
        this.setState({image: URL.createObjectURL(event.target.files[0])});
    }

    validate = () => {
        let nameError="";
        let emailError="";
        let mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        if(this.state.name.value === " ") {
            nameError = 'Name cannot be empty!';
        }
        if(nameError) {
            this.setState({nameError});
            return false;
        }
    
        if(!this.state.email.match(mailFormat)) {
          emailError = 'Invalid Email!';
        }
        if(emailError) {
          this.setState({emailError});
          return false;
        }
        return true;
      }

    handleSubmit(event) {
        event.preventDefault();
        const isValid = this.validate();
        const {name, email, salary, image, isGoldClient} = this.state;
        if(isValid) {
            this.props.submitAddForm(event, name, email, salary, image, isGoldClient);
            this.setState(initialState);
        }
    }

 

    render() {
    
        return (
            <form
                className="user-add-form"
                onSubmit={(event) => this.handleSubmit(event)}
            >
                <h2>Add users:</h2>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    onChange={(event) => this.updateName(event)}
                />
                {
                this.state.nameError  
                    ? <div className="name_error">{this.state.nameError}</div>
                    : null
                }
                
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    name="email"
                    onChange={(event) => this.updateEmail(event)}
                />
                {
                this.state.emailError 
                    ? <div className="email_error">{this.state.emailError}</div>
                    : null
                }
                
                <label htmlFor="salary">Salary:</label>
                <input 
                    type="text"
                    name="salary"
                    onChange={(event) => this.updateSalary(event)}
                /> 
                
                <label htmlFor="image">Upload an image:</label>
                <input 
                    className="upload-image"
                    type="file" 
                    name="image" 
                    onChange={(event) => this.updateImage(event)}    
                />
                <div className="gold-client">
                    <label htmlFor="is-gold-client" className="gold-client-label">Client GOLD</label>
                    <input
                        className="gold-client-input"
                        type="checkbox"
                        name="is-gold-client"
                        value="true"
                        onChange={(event) => this.updateIsGoldClient(event)}
                    />
                </div>


                <input type="submit" className="submit" value="Add User"/>
            </form>
        )
    }
}

export default UserAddForm;
