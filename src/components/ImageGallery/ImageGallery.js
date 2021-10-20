import { Component } from 'react';
import styles from 'components/ImageGallery/ImageGallery.module.css';
import PicsApiService from 'services/apiService';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import Spiner from 'components/Loader/Loader';

const newPicsApiService = new PicsApiService();

export class ImageGallery extends Component {
  state = {
    searchResults: [],
    status: 'init',
    showModal: false,
    modalImage: '',
    showSpiner: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ status: 'pending' });
      newPicsApiService.query = this.props.searchQuery;
      newPicsApiService
        .fetchPictures()
        .then(result =>
          this.setState({ searchResults: result, status: 'success' }),
        )
        .catch(error => {
          this.setState({ status: 'error' });
        });
    }
  }

  handleOnClick = e => {
    newPicsApiService.incrementPage();
    this.togleSpiner();
    newPicsApiService
      .fetchPictures()
      .then(result => {
        this.setState(prevState => ({
          searchResults: [...prevState.searchResults, ...result],
          status: 'success',
        }));
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
        this.togleSpiner();
      })
      .catch(error => {
        this.setState({ status: 'error' });
      });
  };
  togleSpiner = () => this.setState({ showSpiner: !this.state.showSpiner });
  togleModal = () => this.setState({ showModal: !this.state.showModal });

  showModal = e => {
    this.togleModal();
    this.setState({ modalImage: e.target });
  };

  render() {
    if (this.state.status === 'init') {
      return <h1>Hallo! Search something!</h1>;
    }
    if (this.state.status === 'pending') {
      return <Spiner />;
    }
    if (this.state.status === 'success') {
      return (
        <>
          <ul className={styles.ImageGallery}>
            <ImageGalleryItem
              photos={this.state.searchResults}
              showModal={this.showModal}
            />
          </ul>
          {this.state.showSpiner && <Spiner />}
          <Button handleOnClick={this.handleOnClick} />
          {this.state.showModal && (
            <Modal togleModal={this.togleModal} img={this.state.modalImage} />
          )}
        </>
      );
    }
    if (this.state.status === 'error') {
      alert('ERROR!!');
    }
  }
}
