import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import fetchPictures from './Api';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';
import styles from './App.module.css';

Notiflix.Notify.init({
  position: 'left-top',
  cssAnimationStyle: 'zoom',
  fontSize: '20px',
});

export const App = () => {
  const [pictures, setPictures] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [modalURL, setModalURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    setIsLoading(true);
    const findPictures = fetchPictures(searchQuery, pageNumber);
    setLoadMore(true);

    findPictures
      .then(res => {
        if (res.length === 0) {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          setLoadMore(false);
          setIsLoading(false);
        }

        if (res.length < 12) {
          setLoadMore(false);
          setIsLoading(false);
        }

        setPictures(prevPictures => [...prevPictures, ...res]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchQuery, pageNumber]);

  const formSubmitHandler = query => {
    setSearchQuery(query);
    setPageNumber(1);
    setPictures([])
    setLoadMore(false)
  };

  
  const imageClickHandler = url => {
    setModalURL(url);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={formSubmitHandler} />
      <div className="gallery-wrap">
        <ImageGallery>
          {pictures.map(picture => (
            <ImageGalleryItem
              key={picture.id}
              picture={picture}
              onClick={imageClickHandler}
            />
          ))}
        </ImageGallery>
        {loadMore && (
          <Button
            onClick={setPageNumber}
            page={pageNumber}
          />
        )}
      </div>
      {isLoading && <Loader />}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={modalURL} alt={pictures.tags} />
        </Modal>
      )}
    </div>
  );
};
