import styles from 'components/Button/Button.module.css';

export function Button({ handleOnClick }) {
  return (
    <button type="button" className={styles.Button} onClick={handleOnClick}>
      LoadMore
    </button>
  );
}
