import PropTypes from 'prop-types';

import { Component } from 'react';
import styles from 'components/Searchbar/Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    searchQery: '',
  };

  handleOnSubmit = e => {
    e.preventDefault();

    this.props.getSearchQuery(this.state.searchQery);
    this.setState({ searchQery: '' });
  };

  handleOnChange = e => this.setState({ searchQery: e.target.value });

  render() {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleOnSubmit}>
          <button type="submit" className={styles.SearchForm__button}>
            <span className={styles.SearchForm__button__label}>Search</span>
          </button>

          <input
            className={styles.SearchForm__input}
            value={this.state.searchQery}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleOnChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  getSearchQuery: PropTypes.func.isRequired,
};
