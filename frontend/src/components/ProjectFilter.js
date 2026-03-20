import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ProjectFilter.css";

const techOptions = [
  "React",
  "Node",
  "Python",
  "Django",
  "Vue",
  "Angular",
  "MongoDB",
  "PostgreSQL",
  "TypeScript",
  "GraphQL",
  "Redis",
  "Docker",
  "AWS",
  "Firebase",
];

const categoryOptions = ["Web", "Mobile", "AI", "DevTools", "Game", "Data"];

function ProjectFilter({ onFilterChange }) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    onFilterChange(name, value);
  }

  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
    onFilterChange("search", e.target.value);
  }

  return (
    <div className="project-filter">
      <input
        type="text"
        placeholder="Search projects by title or description..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="project-search-input"
      />
      <select name="techStack" onChange={handleChange} defaultValue="">
        <option value="">All Tech Stacks</option>
        {techOptions.map((tech, i) => (
          <option key={i} value={tech}>
            {tech}
          </option>
        ))}
      </select>
      <select name="category" onChange={handleChange} defaultValue="">
        <option value="">All Categories</option>
        {categoryOptions.map((cat, i) => (
          <option key={i} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}

ProjectFilter.propTypes = {
  onFilterChange: PropTypes.func,
};

export default ProjectFilter;