import React from "react";
import PropTypes from "prop-types";
import "./ProjectCard.css";

function ProjectCard({ project, onView, onEdit, onDelete }) {
  return (
    <div className="project-card">
      <h3>{project.title}</h3>
      <p className="project-author">by {project.authorName}</p>
      <p className="project-category">{project.category}</p>
      <div className="project-stack">
        {project.techStack.map((tech, i) => (
          <span key={i} className="stack-tag">
            {tech}
          </span>
        ))}
      </div>
      <div className="project-actions">
        <button onClick={() => onView(project)}>View</button>
        <button onClick={() => onEdit(project)}>Edit</button>
        <button onClick={() => onDelete(project._id)}>Delete</button>
      </div>
    </div>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    authorName: PropTypes.string,
    category: PropTypes.string,
    techStack: PropTypes.arrayOf(PropTypes.string),
  }),
  onView: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default ProjectCard;
