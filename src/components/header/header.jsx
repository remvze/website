import { motion, useScroll, useSpring } from 'framer-motion';
import {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoGithub,
  IoMail,
} from 'react-icons/io5';

import styles from './header.module.css';

const Header = () => {
  const { scrollY } = useScroll();
  const rotate = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const socials = [
    {
      name: 'GitHub',
      icon: <IoLogoGithub />,
      link: 'https://github.com/remvze',
    },
    {
      name: 'Instagram',
      icon: <IoLogoInstagram />,
      link: 'https://instagram.com/remvze',
    },
    {
      name: 'Twitter',
      icon: <IoLogoTwitter />,
      link: 'https://twitter.com/remvze',
    },
    {
      name: 'Email',
      icon: <IoMail />,
      link: 'mailto:mvze@tuta.io',
    },
  ];

  const headerVariants = {
    hide: {
      opacity: 0,
      scale: 0,
      y: 10,
    },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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
    <motion.header
      variants={headerVariants}
      transformTemplate={(_, generate) => `translateX(-50%) ${generate}`}
      className={styles.header}
    >
      <motion.h2 variants={variants} className={styles.logo}>
        <motion.span style={{ rotate }}>✱</motion.span> Maze
      </motion.h2>

      <motion.ul className={styles.socials}>
        {socials.map((social, i) => (
          <motion.li variants={variants} key={i}>
            <a href={social.link}>{social.icon}</a>
          </motion.li>
        ))}
      </motion.ul>
    </motion.header>
  );
};

export default Header;
