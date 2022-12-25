import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [showMore, setShowMore] = useState(false);

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

  const moreVariants = {
    hide: {
      opacity: 0,
      height: 0,
      marginTop: 0,
    },
    show: {
      opacity: 1,
      height: 'auto',
      marginTop: 15,
    },
  };

  const moreLessVariants = {
    hide: {
      opacity: 0,
      x: -20,
    },
    show: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: 20,
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
          A design-driven developer
          <span className={styles.orange}>✺</span>by day, dedicated to crafting
          practical solutions with delightful experiences through simple yet
          elegant design and scalable code. A curious mind
          <span className={styles.indigo}>✶</span>by night, philosophizing day
          to day life in order to make sense of it all and eventually
          <span className={styles.green}>✼</span>connect the dots.
        </motion.p>

        <AnimatePresence>
          {showMore && (
            <motion.p
              variants={moreVariants}
              initial="hide"
              animate="show"
              exit="hide"
              transition={{ ease: 'easeOut' }}
              className={styles.desc}
            >
              Currently the founder of{' '}
              <a href="https://instagram.com/philosophors">✧ Philosophors</a>,
              and the indie maker of{' '}
              <a href="https://github.com/remvze">digital products</a> focused
              on exploration of new ideas:
              <span className={styles.red}>✯</span>from better ways to boost
              your productivity,<span className={styles.pink}>✴</span>to simpler
              solutions for a more private internet; all while maintaining an
              intuitive experience for their users.
            </motion.p>
          )}
        </AnimatePresence>

        <motion.button
          className={styles.moreLess}
          onClick={() => setShowMore(prev => !prev)}
          variants={variants}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              variants={moreLessVariants}
              initial="hide"
              animate="show"
              exit="exit"
              style={{ display: 'block' }}
              key={showMore}
              transition={{
                duration: 0.15,
                ease: 'easeInOut',
              }}
            >
              Read {showMore ? 'Less' : 'More'}
            </motion.span>
          </AnimatePresence>
        </motion.button>

        <motion.h3 variants={variants} className={styles.label}>
          Let&apos;s connect <span className={styles.callEmoji}>🤙</span>
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
