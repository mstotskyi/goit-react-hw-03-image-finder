import PropTypes from 'prop-types';
import { Component } from 'react';
import styles from 'components/Modal/Modal.module.css';
import { createPortal } from 'react-dom';

export class Modal extends Component {
  state = {};
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscape);
  }

  handleEscape = e => {
    let condition = e.code === 'Escape';
    if (condition) {
      this.props.togleModal();
    }
  };

  render() {
    return createPortal(
      <div className={styles.Overlay} onClick={this.props.togleModal}>
        <div className={styles.Modal}>
          <img src={this.props.img.dataset.source} alt={this.props.img.alt} />
        </div>
      </div>,
      document.getElementById('modalRoot'),
    );
  }
}

Modal.propTypes = {
  img: PropTypes.object,
  togleModal: PropTypes.func,
};
