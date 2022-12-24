import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoGithub,
  IoMail,
} from 'react-icons/io5';

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

  const socials = [
    {
      name: 'GitHub',
      icon: <IoLogoGithub />,
      link: 'https://github.com/remvze',
    },
    {
      name: 'Twitter',
      icon: <IoLogoTwitter />,
      link: 'https://twitter.com/remvze',
    },
    {
      name: 'Instagram',
      icon: <IoLogoInstagram />,
      link: 'https://instagram.com/remvze',
    },
    {
      name: 'Email',
      icon: <IoMail />,
      link: 'mailto:mvze@tuta.io',
    },
  ];

  const titleVariants = {
    hide: {},
    show: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0,
      },
    },
  };

  const blobVariants = {
    hide: {
      opacity: 0,
      scale: 0,
    },
    show: {
      opacity: 0.08,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const socialsVariants = {
    hide: {},
    show: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const iconVariants = {
    hide: {
      opacity: 0,
      y: 30,
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
      <Container>
        <motion.h1 variants={titleVariants} className={styles.title}>
          <motion.p variants={variants}>
            <span>✱ Developer &</span>
            <br />
            <span>
              <i>Design</i> Technologist.
            </span>
          </motion.p>

          <motion.div variants={blobVariants} className={styles.blob} />
        </motion.h1>

        <motion.p variants={variants} className={styles.desc}>
          A design-driven develop
          <span className={styles.orange}>✺</span>by day, dedicated to crafting
          practical solutions with delightful experiences through simple yet
          elegant design and scalable code. A curiour mind
          <span className={styles.indigo}>✶</span>by night, philosophizing day
          to day life in order to make sense of it all and eventually
          <span className={styles.green}>✣</span>connect the dots.
        </motion.p>

        <motion.p variants={variants} className={styles.desc}>
          Currently the founder of{' '}
          <a href="https://instagram.com/philosophors">✧ Philosophors</a>.
        </motion.p>

        <motion.h3 variants={variants} className={styles.label}>
          — Let&apos;s connect
        </motion.h3>

        <div>
          <motion.ul variants={socialsVariants} className={styles.socials}>
            {socials.map((social, i) => (
              <motion.li variants={iconVariants} key={i}>
                <a href={social.link}>{social.icon}</a>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Container>
    </motion.div>
  );
};

export default HomeView;
