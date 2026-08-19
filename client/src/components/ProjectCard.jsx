const ProjectCard = ({ project }) => {
  const { title, description, techStack = [], imageUrl, githubLink, liveLink } = project;

  return (
    <div className="project-card">
      {imageUrl && <img src={imageUrl} alt={title} className="project-image" />}
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="tech-stack">
        {techStack.map((tech) => (
          <span key={tech} className="tech-badge">{tech}</span>
        ))}
      </div>
      <div className="project-links">
        {githubLink && <a href={githubLink} target="_blank" rel="noreferrer">GitHub</a>}
        {liveLink && <a href={liveLink} target="_blank" rel="noreferrer">Live Demo</a>}
      </div>
    </div>
  );
};

export default ProjectCard;
