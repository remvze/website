import { motion } from 'framer-motion';

import styles from './projects.module.css';

const Projects = () => {
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
    <div className={styles.wrapper}>
      <motion.h2 variants={variants} className={styles.title}>
        Projects <div />
      </motion.h2>
      <motion.p variants={variants} className={styles.desc}>
        Carefully crafted. Tastefully polished.
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
    </div>
  );
};

export default Projects;
