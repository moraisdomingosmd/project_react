import P from 'prop-types'
import './style.css'

export const TextInput = ({ searchValue, handleChange }) => {
    return (
        <input
            className='text-input'
            type="search"
            onChange={handleChange}
            value={searchValue}
            placeholder='Pesquisa por Posts'
      />
    )
}

TextInput.propTypes = {
  searchValue: P.string.isRequired,
  handleChange: P.func.isRequired
}
