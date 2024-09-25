import { motion } from 'framer-motion';

import { Container } from '../container';

import styles from './hero.module.css';

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { filter: 'blur(5px)', opacity: 0, y: 35 },
    show: {
      filter: 'blur(0)',
      opacity: 1,
      transition: { duration: 0.3 },
      y: 0,
    },
  };

  return (
    <Container>
      <motion.section
        animate="show"
        className={styles.hero}
        initial="hidden"
        variants={containerVariants}
      >
        <motion.h1 className={styles.name} variants={itemVariants}>
          <span className={styles.muted}>re</span>Ma<sup>v</sup>ze Heart
          <span className={styles.muted}>;</span>
        </motion.h1>
        <motion.p className={styles.desc} variants={itemVariants}>
          Programming + Philosophy.
        </motion.p>
        <motion.p className={styles.founder} variants={itemVariants}>
          Founder of{' '}
          <a href="https://philosophors.com/" rel="noreferrer" target="_blank">
            Philosophors
          </a>
          .
        </motion.p>
      </motion.section>
    </Container>
  );
}
