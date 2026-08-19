import { motion } from 'framer-motion';
import useFetch from '../hooks/useFetch';
import { getProjects } from '../services/api';
import ProjectCard from '../components/ProjectCard';
import PageWrapper from '../components/PageWrapper';

const Projects = () => {
  const { data: projects, loading, error } = useFetch(getProjects, []);

  return (
    <PageWrapper>
      <section className="projects-section">
        <h2 className="section-title">My Projects</h2>
        <p className="section-subtitle">
          A selection of things I've built — more coming soon.
        </p>

        {loading && <p className="status-message">Loading projects...</p>}
        {error && (
          <p className="status-message error">
            Failed to load projects. Make sure the backend is running.
          </p>
        )}

        {!loading && !error && (
          <motion.div
            className="projects-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {projects && projects.length > 0 ? (
              projects.map((project, i) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))
            ) : (
              <p className="status-message">
                No projects yet. Log in to the admin panel to add some.
              </p>
            )}
          </motion.div>
        )}
      </section>
    </PageWrapper>
  );
};

export default Projects;
