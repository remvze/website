import { motion } from 'framer-motion';

import { Container } from '../container';

import styles from './websites.module.css';

export function Websites() {
  const websites = [
    {
      title: 'Productivity',
      websites: [
        {
          name: 'Moodist',
          sub: 'moodist',
          url: 'https://moodist.mvze.net',
        },
        {
          name: 'Calmness',
          sub: 'calmness',
          url: 'https://calmness.mvze.net',
        },
        {
          name: 'Timesy',
          sub: 'timesy',
          url: 'https://timesy.mvze.net',
        },
      ],
    },
    {
      title: 'Experiments',
      websites: [
        {
          name: 'Progress',
          sub: 'progress',
          url: 'https://progress.mvze.net',
        },
        {
          name: 'Nothing',
          sub: 'nothing',
          url: 'https://nothing.mvze.net',
        },
        {
          name: 'Omniscale',
          sub: 'omniscale',
          url: 'https://omniscale.mvze.net',
        },
      ],
    },
    {
      title: 'Other Tools',
      websites: [
        {
          name: 'Converto',
          sub: 'converto',
          url: 'https://converto.mvze.net',
        },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
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
        className={styles.websites}
        initial="hidden"
        variants={containerVariants}
      >
        {websites.map(website => (
          <section key={website.title}>
            <motion.h2 variants={itemVariants}>
              {website.title}
              <span>:</span>
            </motion.h2>

            <div className={styles.websitesWrapper}>
              {website.websites.map(website => (
                <motion.div
                  className={styles.website}
                  key={website.url}
                  variants={itemVariants}
                >
                  <a href={website.url}>{website.name}</a>
                  <div className={styles.divider} />
                  <p>
                    <span>{website.sub}</span>.mvze.net
                  </p>
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </motion.section>
    </Container>
  );
}