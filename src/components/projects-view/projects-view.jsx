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
      logo: '/images/moice.svg',
    },
  ];

  return (
    <div className={styles.wrapper}>
      <Container>
        <motion.h1 className={styles.title}>Projects</motion.h1>
        <p className={styles.desc}>
          A collection of carefully crafted products.
        </p>

        <div className={styles.projects}>
          {projects.map((project, i) => (
            <div className={styles.projectContainer} key={i}>
              <div className={styles.projectLogo}>
                <img src={project.logo} alt="logo" />
              </div>
              <div className={styles.projectInfo}>
                <h3 className={styles.projectName}>{project.name}</h3>
                <p className={styles.projectDesc}>{project.desc}</p>
                {project.link ? (
                  <a className={styles.projectLink} href={project.link}>
                    <div className={styles.visit}>
                      <span>Visit</span>
                      <span>Visit</span>
                    </div>{' '}
                    <span className={styles.arrow}>→</span>
                  </a>
                ) : (
                  <p className={styles.comingSoon}>Coming Soon</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ProjectsView;
