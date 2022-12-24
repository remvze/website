import { useState, useCallback, useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import PropTypes from 'prop-types';

import { wait } from '@/utils/wait';

import styles from './loader.module.css';

const Loader = ({ show, onEnd }) => {
  const [play, setPlay] = useState(false);

  const first = useAnimationControls();
  const second = useAnimationControls();
  const third = useAnimationControls();

  const sequence = useCallback(async () => {
    await Promise.all([
      first.start({
        opacity: 1,
        scale: [1, 1.05, 1],
        transition: { duration: 0.25, type: 'spring' },
      }),
      second.start({
        opacity: 1,
        scale: [1, 1.05, 1],
        transition: { duration: 0.25, type: 'spring' },
      }),
      third.start({
        opacity: 1,
        scale: [1, 1.05, 1],
        transition: { duration: 0.25, type: 'spring' },
      }),
    ]);
    await wait(300);
    await Promise.all([
      second.start({
        rotate: 60,
        transition: { duration: 0.4, type: 'spring' },
      }),
      third.start({
        rotate: 120,
        transition: { duration: 0.4, type: 'spring' },
      }),
    ]);
    await wait(500);
    await Promise.all([
      first.start({ background: '#fff' }),
      second.start({
        background: '#fff',
        rotate: 420,
        transition: { duration: 0.7, type: 'spring' },
      }),
      third.start({
        background: '#fff',
        rotate: 480,
        transition: { duration: 0.7, type: 'spring' },
      }),
    ]);
    await wait(250);
    await Promise.all([
      first.start({
        opacity: 0,
        scale: 0,
        transition: { duration: 0.25, type: 'spring' },
      }),
      second.start({
        opacity: 0,
        scale: 0,
        transition: { duration: 0.25, type: 'spring' },
      }),
      third.start({
        opacity: 0,
        scale: 0,
        transition: { duration: 0.25, type: 'spring' },
      }),
    ]);
  }, [first, second, third]);

  useEffect(() => {
    setTimeout(() => setPlay(true), 1000);
  }, []);

  useEffect(() => {
    const animate = async () => {
      await sequence();
      setPlay(false);
      onEnd();
    };

    if (play) animate();
  }, [play, sequence, onEnd]);

  const variants = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
  };

  const style = {
    background: 'transparent',
  };

  return show ? (
    <div className={styles.wrapper}>
      <motion.div
        variants={variants}
        initial="hidden"
        style={style}
        className={styles.line}
        animate={first}
      />

      <motion.div
        variants={variants}
        initial="hidden"
        style={style}
        className={styles.line}
        animate={second}
      />

      <motion.div
        variants={variants}
        initial="hidden"
        style={style}
        className={styles.line}
        animate={third}
      />
    </div>
  ) : (
    ''
  );
};

Loader.propTypes = {
  show: PropTypes.bool,
  onEnd: PropTypes.func,
};

export default Loader;
