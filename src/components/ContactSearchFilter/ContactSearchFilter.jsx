
import PropTypes from 'prop-types'

export const ContactSearchFilter = ({ filter, handleChangeFilter }) => (
    <label>
        Find contacts by name:
        <input
            type="text"
            name="filter"
            value={filter}
            required
            onChange={handleChangeFilter}
        />
    </label>
);

ContactSearchFilter.propTypes = {
    filter: PropTypes.string.isRequired,
    handleChangeFilter: PropTypes.func.isRequired,
}