import { useState } from 'react';
import { motion } from 'framer-motion';
// import {
//   IoLogoInstagram,
//   IoLogoTwitter,
//   IoLogoGithub,
//   IoMail,
// } from 'react-icons/io5';

import Container from '@/components/container';
import Loader from '@/components/loader';
import Header from '@/components/header';
import Projects from '@/components/projects';

import styles from './home-view.module.css';

const HomeView = () => {
  const [loading, setLoading] = useState(true);

  if (loading) return <Loader show={loading} onEnd={() => setLoading(false)} />;

  const containerVariants = {
    hide: {},
    show: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  };

  const variants = {
    hide: {
      opacity: 0,
      y: 20,
    },
    show: {
      opacity: 1,
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
      <Header />

      <Container>
        <motion.h1 variants={variants} className={styles.title}>
          — Developer &
          <br />
          <i>Design</i> Technologist.
        </motion.h1>

        <motion.p variants={variants} className={styles.desc}>
          A <span>design-driven developer</span> by day, dedicated to crafting
          practical solutions with delightful experiences through simple yet
          elegant design and scalable code. A <span>curious mind</span> by
          night, philosophizing day to day life in order to make sense of it all
          and eventually connect the dots.
        </motion.p>

        <motion.p variants={variants} className={styles.desc}>
          Currently the curator of{' '}
          <a href="https://instagram.com/philosophors">✧ Philosophors</a>.
        </motion.p>

        <Projects />

        {/*<div className={styles.socialsContainer}>
          <motion.div variants={emojiVariants} className={styles.socialsEmoji}>
            <span className={styles.callEmoji}>🤙</span>
          </motion.div>
          <motion.ul variants={socialsVariants} className={styles.socials}>
            {socials.map((social, i) => (
              <motion.li variants={iconVariants} key={i}>
                <a href={social.link}>{social.icon}</a>
              </motion.li>
            ))}
          </motion.ul>
            </div>*/}
      </Container>
    </motion.div>
  );
};

export default HomeView;
