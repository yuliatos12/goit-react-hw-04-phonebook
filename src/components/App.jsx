import React, { Component } from 'react';
import { ContactForm } from "./ContactForm/ContactForm";
import { nanoid } from 'nanoid'
import { ContactList } from "./ContactList/ContactList";
import { ContactSearchFilter } from "./ContactSearchFilter/ContactSearchFilter";
import css from "./App.module.css"

const LS_KEY = 'contacts';
export class App extends Component {
  state = {
    contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ],
    filter: '',
  }
  componentDidMount = () => {
    const startState = JSON.parse(localStorage.getItem(LS_KEY));
    if (startState) {
      this.setState({ contacts: [...startState] });
    };
  }

  componentDidUpdate = (_, prevState) => {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts))
      
    };
  }
  handleFormSubmit = data => {
    const newContact = { ...data, id: nanoid() };
    this.setState(({ contacts }) => {
      if (this.isNameNew(contacts, newContact) === undefined) {
        return { contacts: [...contacts, newContact] }
      } else {
       alert(`${newContact.name} is already in contacts`);
        return { contacts: [...contacts] }
      };
    });
  }

   isNameNew = (contacts, newContact) => {
     return contacts.find(({ name }) => 
      name.toLowerCase() === newContact.name.toLowerCase())
  }

  handleChangeFilter = (event) => {
    const {value} = event.currentTarget;
    this.setState({ filter: value })
  }

   filterByName = () => {
    const { contacts, filter } = this.state;
    const lowerFilter = filter.toLowerCase();
    return contacts.filter(({ name }) => 
      (name.toLowerCase().includes(lowerFilter) ))
  }

  deleteContact = (contactId) => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId)
    }));
  }

  render() {
    const { filter } = this.state;
    const visibleContacts = this.filterByName();

    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm handleFormSubmit={this.handleFormSubmit} />
        <h2>Contacts</h2>
        <ContactSearchFilter filter={filter} handleChangeFilter={this.handleChangeFilter} />
        <ContactList contacts={visibleContacts} deleteContact={this.deleteContact} />
      </div>
    );
  };
};