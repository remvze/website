import { motion } from 'framer-motion';

import Container from '@/components/container';

import styles from './projects-view.module.css';

const ProjectsView = () => {
  const projects = [
    {
      name: 'Moice',
      desc: 'Minimal and intuitive task manager.',
      link: 'https://moice.run',
      logo: '/images/moice.svg',
    },
    {
      name: 'Pice',
      desc: 'The password generator you need.',
      link: null,
      logo: '/images/pice.svg',
    },
  ];

  const wrapperVariants = {
    hide: {},
    show: {
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.1,
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
      variants={wrapperVariants}
      initial="hide"
      animate="show"
      className={styles.wrapper}
    >
      <Container>
        <motion.h1 variants={variants} className={styles.title}>
          Projects
        </motion.h1>
        <motion.p variants={variants} className={styles.desc}>
          A collection of carefully crafted products.
        </motion.p>

        <div className={styles.projects}>
          {projects.map((project, i) => (
            <motion.div
              variants={variants}
              className={styles.projectContainer}
              key={i}
            >
              <div className={styles.projectLogo}>
                <img src={project.logo} alt="logo" />
              </div>
              <div className={styles.projectInfo}>
                <h3 className={styles.projectName}>{project.name}</h3>
                <p className={styles.projectDesc}>{project.desc}</p>
                {project.link ? (
                  <a className={styles.projectLink} href={project.link}>
                    <div className={styles.visit}>
                      <span>Visit Project</span>
                      <span>Visit Project</span>
                    </div>
                  </a>
                ) : (
                  <p className={styles.comingSoon}>Coming Soon</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </motion.div>
  );
};

export default ProjectsView;
