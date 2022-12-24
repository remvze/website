import { useState } from 'react';
import { motion } from 'framer-motion';

import Container from '@/components/container';
import Loader from '@/components/loader';

import styles from './home-view.module.css';

const HomeView = () => {
  const [loading, setLoading] = useState(true);

  if (loading) return <Loader show={loading} onEnd={() => setLoading(false)} />;

  const containerVariants = {
    hide: {},
    show: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.4,
      },
    },
  };

  const variants = {
    hide: {
      opacity: 0,
      x: -30,
      y: 5,
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hide"
      animate="show"
      className={styles.wrapper}
    >
      <Container>
        <motion.h1 variants={variants} className={styles.title}>
          <p>
            <span>✱ Developer &</span>
            <br />
            <span>
              <i>Design</i> Technologist.
            </span>
          </p>
        </motion.h1>

        <motion.p variants={variants} className={styles.desc}>
          A design-driven develop<span className={styles.orange}>✺</span>by day,
          dedicated to crafting practical solutions with delightful experiences
          through simple yet elegant design and scalable code. A curiour mind
          <span className={styles.indigo}>✶</span>by night, philosophizing day
          to day life in order to make sense of it all and eventually
          <span className={styles.green}>✣</span>connect the dots.
        </motion.p>

        <motion.p variants={variants} className={styles.desc}>
          Currently the founder of{' '}
          <a href="https://instagram.com/philosophors">✧ Philosophors</a>.
        </motion.p>
      </Container>
    </motion.div>
  );
};

export default HomeView;
