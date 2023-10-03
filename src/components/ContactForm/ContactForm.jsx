import { useState } from "react";
import PropTypes from 'prop-types'

export const ContactForm = ({ handleFormSubmit }) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleSubmitAddContact = (event) => {
        event.preventDefault();
        const data = { name, number };
        handleFormSubmit(data);
        reset();
    };

    const handleInputChange = (event) => {
        const { name, value } = event.currentTarget;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'number':
                setNumber(value);
                break;
        
            default:
                break;
        };
    };

    const reset = () => {
        setName('');
        setNumber('');
    };

    return (
        <form onSubmit={handleSubmitAddContact}>
            <label>
                Name
                <input
                    type="text"
                    name="name"
                    value={name}
                    pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$" title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    onChange={handleInputChange}
                />
            </label>
            <label>
                Phone number
                <input
                    type="tel"
                    name="number"
                    value={number}
                    pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}" title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    onChange={handleInputChange}
                />
            </label>
            <button type="submit">
                Add contact
            </button>
        </form>
    );
};

ContactForm.propTypes = {
    handleFormSubmit: PropTypes.func.isRequired
};