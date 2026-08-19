import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';

const skills = [
  {
    category: 'Frontend',
    items: ['React.js', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express.js', 'C#', 'ASP.NET', 'ASP.NET Core MVC', 'ADO.NET', 'REST APIs', 'JWT'],
  },
  {
    category: 'Database',
    items: ['MongoDB', 'SQL' ],
  },
  {
    category: 'Cloud & Microsoft',
    items: ['Microsoft Azure', 'Power Apps', 'Power Automate', 'Dataverse'],
  },
  {
    category: 'Tools',
    items: ['Git', 'GitHub', 'Docker', 'Postman', 'VS Code' ,'Dynamics 365'],
  },
];

const About = () => {
  return (
    <PageWrapper>
      <section className="about-section">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <p>
  I'm Nitin Patil, a software engineer passionate about building modern,
  scalable, and user-focused web applications. I enjoy working across the
  full stack, from creating intuitive interfaces to developing reliable
  backend services and APIs.
</p>

<p>
  My core expertise is in the MERN stack, along with experience in modern
  Microsoft technologies. I hold Microsoft certifications including
  <strong>AB-900, PL-900, PL-200, and MB-280</strong>, reflecting my interest
  in cloud, business applications, and enterprise technology.
</p>

<p>
  I’m always curious to learn, experiment with new technologies, and turn
  ideas into meaningful projects. Outside of coding, I enjoy exploring
  emerging tech trends and continuously improving my development skills.
</p>

          </motion.div>
          <motion.div
            className="skills-grid"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
          >
            {skills.map(({ category, items }) => (
              <div key={category} className="skill-card">
                <h3>{category}</h3>
                <ul>
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default About;
