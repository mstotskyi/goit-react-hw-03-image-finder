import PropTypes from 'prop-types';

import styles from 'components/ImageGalleryItem/ImageGalleryItem.module.css';

export function ImageGalleryItem({ photos, showModal }) {
  return (
    photos.length > 0 &&
    photos.map(photo => (
      <li
        key={photo.webformatURL}
        className={styles.ImageGalleryItem}
        onClick={showModal}
      >
        <img
          src={photo.webformatURL}
          alt={photo.tags}
          data-source={photo.largeImageURL}
          className={styles.ImageGalleryItem__image}
        />
      </li>
    ))
  );
}

ImageGalleryItem.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object),
  showModal: PropTypes.func,
};
