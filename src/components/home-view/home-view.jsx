import Container from '@/components/container';

import styles from './home-view.module.css';

const HomeView = () => {
  return (
    <div className={styles.wrapper}>
      <Container>
        <h1>Hello World</h1>
      </Container>
    </div>
  );
};

export default HomeView;
