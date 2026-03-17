import React, { useState } from "react";
import ProjectList from "./components/ProjectList";
import ProjectForm from "./components/ProjectForm";
import ProjectDetail from "./components/ProjectDetail";
import StatsPanel from "./components/StatsPanel";
import "./App.css";

function App() {
  const [view, setView] = useState("list");
  const [selectedProject, setSelectedProject] = useState(null);

  function handleView(project) {
    setSelectedProject(project);
    setView("detail");
  }

  function handleEdit(project) {
    setSelectedProject(project);
    setView("form");
  }

  function handleSave() {
    setSelectedProject(null);
    setView("list");
  }

  function handleCancel() {
    setSelectedProject(null);
    setView("list");
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>DevBoard</h1>
        <nav>
          <button onClick={() => setView("list")}>Projects</button>
          <button
            onClick={() => {
              setSelectedProject(null);
              setView("form");
            }}
          >
            Add Project
          </button>
          <button onClick={() => setView("stats")}>Stats</button>
        </nav>
      </header>

      <div className="app-instructions">
        <p>
          <strong>How to use:</strong> Browse projects using filters, click View
          to see details, Add Project to create a new one, and Stats to explore
          community trends.
        </p>
      </div>

      <main className="app-main">
        {view === "list" && (
          <ProjectList onView={handleView} onEdit={handleEdit} />
        )}
        {view === "form" && (
          <ProjectForm
            project={selectedProject}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}
        {view === "detail" && selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onBack={() => setView("list")}
          />
        )}
        {view === "stats" && <StatsPanel />}
      </main>
    </div>
  );
}

export default App;
