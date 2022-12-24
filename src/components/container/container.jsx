import PropTypes from 'prop-types';

import styles from './container.module.css';

const Container = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

Container.propTypes = {
  children: PropTypes.any,
};

export default Container;
