import PropTypes from 'prop-types'

export const ContactListItem = ({ name, number, id, deleteContact }) =>
(<li key={id}>
    <p>{name}: {number}</p>
    <button type="button" onClick={() => deleteContact(id)}>Delete</button>
</li>);
    
ContactListItem.propTypes = {
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
};