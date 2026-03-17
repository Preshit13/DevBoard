import React from "react";
import PropTypes from "prop-types";
import "./ProjectDetail.css";

function ProjectDetail({ project, onBack }) {
  return (
    <div className="project-detail">
      <button onClick={onBack}>← Back</button>
      <h2>{project.title}</h2>
      <p>
        <strong>Author:</strong> {project.authorName}
      </p>
      <p>
        <strong>Category:</strong> {project.category}
      </p>
      <p>
        <strong>Description:</strong> {project.description}
      </p>
      <div className="project-stack">
        <strong>Tech Stack:</strong>
        {project.techStack.map((tech, i) => (
          <span key={i} className="stack-tag">
            {tech}
          </span>
        ))}
      </div>
      {project.githubLink && (
        <p>
          <strong>GitHub:</strong>{" "}
          <a href={project.githubLink} target="_blank" rel="noreferrer">
            {project.githubLink}
          </a>
        </p>
      )}
      {project.demoURL && (
        <p>
          <strong>Demo:</strong>{" "}
          <a href={project.demoURL} target="_blank" rel="noreferrer">
            {project.demoURL}
          </a>
        </p>
      )}
      <p>
        <strong>Created:</strong>{" "}
        {new Date(project.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}

ProjectDetail.propTypes = {
  project: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    authorName: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
    techStack: PropTypes.arrayOf(PropTypes.string),
    githubLink: PropTypes.string,
    demoURL: PropTypes.string,
    createdAt: PropTypes.string,
  }),
  onBack: PropTypes.func,
};

export default ProjectDetail;
