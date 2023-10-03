import { ContactListItem } from "components/ContactListItem/ContactListItem"
import PropTypes from 'prop-types'


export const ContactList = ({ contacts, deleteContact }) => (
        <ul>
            {contacts.map(contact => (
                <ContactListItem name={contact.name} number={contact.number} id={contact.id} deleteContact={deleteContact} />
            ))}
        </ul>
    );

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string.isRequired,).isRequired).isRequired,
    onDeleteContact: PropTypes.func.isRequired,
};

