import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({page, onClick}) => {

  let pageNumber = page;
  const handleClick = evt => {
    pageNumber += 1;
    onClick(pageNumber);
  };

  return (
    <button type="button" className={styles.loadMoreButton} onClick={handleClick}>
      Load More
    </button>
  );
};

export default Button;

Button.propTypes = {
  props: PropTypes.shape({
    page: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
  }),
};