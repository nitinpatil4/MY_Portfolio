import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';

const skills = [
  'React',
  'JavaScript',
  'TypeScript',
  'Node.js',
  'Express',
  'MongoDB',
   'SQL',
  'C#',
  'ASP.NET',
  'ASP.NET Core MVC',
  'ADO.NET',
  'Azure',
  'Git',
];

const Home = () => {
  return (
    <PageWrapper>
      <section className="hero">
        <motion.p
          className="hero-greeting"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Hello, I'm
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Nitin Patil
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          Full Stack Developer 
        </motion.p>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          I turn ideas into scalable web experiences using the MERN and .NET ecosystems, blending intuitive interfaces, robust backend architecture, and efficient data solutions to build software that is both reliable and impactful.

        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <Link to="/projects" className="btn btn-primary">
            View Projects
          </Link>

          <Link to="/contact" className="btn btn-outline">
            Get In Touch
          </Link>
        </motion.div>

        <motion.div
          className="hero-skills"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
        >
          {skills.map((skill) => (
            <span key={skill} className="skill-pill">
              {skill}
            </span>
          ))}
        </motion.div>
      </section>
    </PageWrapper>
  );
};

export default Home;