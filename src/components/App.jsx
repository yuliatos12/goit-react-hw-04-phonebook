import { useEffect, useState } from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { nanoid } from 'nanoid'
import { ContactList } from "./ContactList/ContactList";
import { ContactSearchFilter } from "./ContactSearchFilter/ContactSearchFilter";
import css from "./App.module.css"

const LS_KEY = 'contacts';
  const defaultContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];
  
export const App = () => {
  const startState = JSON.parse(localStorage.getItem(LS_KEY));
  
  const [contacts, setContacts] = useState(() => [...startState] ?? defaultContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const handleFormSubmit = data => {
    const newContact = { ...data, id: nanoid() };

    setContacts(prevContacts => {
      if (isNameNew(prevContacts, newContact) === undefined) {
        return [...prevContacts, newContact];
      } else {
        alert(`${newContact.name} is already in contacts`);
        return [...prevContacts];
      };
    });
  };

  const isNameNew = (prevContacts, newContact) => {
    return prevContacts.find(({ name }) =>
      name.toLowerCase() === newContact.name.toLowerCase())
  };

  const handleChangeFilter = (event) => {
    const { value } = event.currentTarget;
    setFilter(value);
  };

  const filterByName = () => {
    const lowerFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      (name.toLowerCase().includes(lowerFilter)))
  }

  const visibleContacts = filterByName();


  const deleteContact = (contactId) => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId));
  };

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm handleFormSubmit={handleFormSubmit} />
      <h2>Contacts</h2>
      <ContactSearchFilter filter={filter} handleChangeFilter={handleChangeFilter} />
      <ContactList contacts={visibleContacts} deleteContact={deleteContact} />
    </div>
  );
};