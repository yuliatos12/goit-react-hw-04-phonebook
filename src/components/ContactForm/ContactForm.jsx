import React, { Component } from 'react';
import PropTypes from 'prop-types'


export class ContactForm extends Component {
    state = {
        name: '',
        number: '',
    }  

    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    }
    
    handleSubmitAddContact = (event) => {
        event.preventDefault();
        this.props.handleFormSubmit(this.state)
        this.reset();
    }

    handleInputChange = (event) => {
        const { name, value } = event.currentTarget;
        this.setState({ [name]: value });
    }

    reset = () =>
        this.setState({
            name: '',
            number: '',
        })

    render() {
        const { name, number } = this.state;

        return (
            <form onSubmit={this.handleSubmitAddContact}>
                <label>
                    Name
                    <input
                        type="text"
                        name="name"
                        value={name}
                        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                        onChange={this.handleInputChange}
                    />
                </label>
                <label>
                    Phone number
                    <input
                        type="tel"
                        name="number"
                        value={number}
                        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                        onChange={this.handleInputChange}
                    />
                </label>
                <button type="submit">
                    Add contact
                </button>
            </form>
        );
    }
}