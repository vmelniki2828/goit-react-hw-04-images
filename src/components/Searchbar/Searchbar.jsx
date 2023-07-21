import React, {  useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import styles from './Searchbar.module.css';
import PropTypes from 'prop-types';

export const Searchbar = ({onSubmit}) => {

  const [query, setQuery] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit(query);
    setQuery('')
  };

  const handleChange = evt => {
    const input = evt.currentTarget.value;
    setQuery(input)
  };

    return (
      <header className={styles.searchbar}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <button type="submit" className={styles.search_btn}>
            <span>
              <BsSearch />
            </span>
          </button>

          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            className={styles.input}
            onChange={handleChange}
          />
        </form>
      </header>
    );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
