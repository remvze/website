import Container from '@/components/container';

import styles from './home-view.module.css';

const HomeView = () => {
  return (
    <div className={styles.wrapper}>
      <Container>
        <h1 className={styles.title}>
          <p>
            <span>✱ Developer &</span>
            <br />
            <span>
              <i>Design</i> Technologist.
            </span>
          </p>
        </h1>

        <p className={styles.desc}>
          A design-driven develop<span className={styles.orange}>✺</span>by day,
          dedicated to crafting practical solutions with delightful experiences
          through simple yet elegant design and scalable code. A curiour mind
          <span className={styles.indigo}>✶</span>by night, philosophizing day
          to day life in order to make sense of it all and eventually
          <span className={styles.green}>✣</span>connect the dots.
        </p>

        <p className={styles.desc}>
          Currently the founder of{' '}
          <a href="https://instagram.com/philosophors">✧ Philosophors</a>.
        </p>
      </Container>
    </div>
  );
};

export default HomeView;
