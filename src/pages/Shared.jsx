import React, { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import { 
  FiFile, 
  FiImage, 
  FiVideo, 
  FiGrid, 
  FiList, 
  FiMoreVertical,
  FiHome,
  FiFolder,
  FiStar,
  FiShare2,
  FiFileText,
  FiFilm,
  FiMusic
} from "react-icons/fi";
import "./Shared.css";

const Shared = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [viewMode, setViewMode] = useState("grid");
  const [showNewMenu, setShowNewMenu] = useState(false);

  // Sample data
  const files = [
    {
      id: 1,
      name: "Project Proposal.docx",
      type: "document",
      sharedBy: "John Doe",
      modified: "2 days ago",
      icon: <FiFileText size={24} />
    },
    {
      id: 2,
      name: "Design Mockup.png",
      type: "image",
      sharedBy: "Jane Smith",
      modified: "1 week ago",
      icon: <FiImage size={24} />
    },
    {
      id: 3,
      name: "Presentation.mp4",
      type: "video",
      sharedBy: "Team",
      modified: "3 days ago",
      icon: <FiFilm size={24} />
    },
    {
      id: 4,
      name: "Meeting Notes.docx",
      type: "document",
      sharedBy: "Alex Johnson",
      modified: "1 day ago",
      icon: <FiFileText size={24} />
    },
    {
      id: 5,
      name: "Budget.xlsx",
      type: "spreadsheet",
      sharedBy: "Finance Team",
      modified: "4 days ago",
      icon: <FiFile size={24} />
    },
    {
      id: 6,
      name: "Product Demo.mp4",
      type: "video",
      sharedBy: "Marketing",
      modified: "5 days ago",
      icon: <FiFilm size={24} />
    }
  ];

  const recentFiles = [
    {
      id: 4,
      name: "Meeting Notes.docx",
      type: "document",
      accessed: "Today",
      icon: <FiFileText size={20} />
    },
    {
      id: 5,
      name: "Budget.xlsx",
      type: "spreadsheet",
      accessed: "Yesterday",
      icon: <FiFile size={20} />
    }
  ];

  const filteredFiles = files.filter(file => {
    if (activeTab === "all") return true;
    return file.type === activeTab;
  });

  const sortedFiles = [...filteredFiles].sort((a, b) => {
    if (sortBy === "date") {
      return a.modified.localeCompare(b.modified);
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  const getFileIcon = (type) => {
    switch (type) {
      case "document":
        return <FiFileText size={24} className="file-type-icon" />;
      case "image":
        return <FiImage size={24} className="file-type-icon" />;
      case "video":
        return <FiFilm size={24} className="file-type-icon" />;
      case "spreadsheet":
        return <FiFile size={24} className="file-type-icon" />;
      default:
        return <FiFile size={24} className="file-type-icon" />;
    }
  };

  const handleNewClick = (type) => {
    setShowNewMenu(false);
    console.log(`Create new ${type}`);
    // Implement actual creation logic here
  };

  return (
    <DashboardLayout>
      <div className="shared-container">
        <div className="shared-header">
          <h1>
            <FiShare2 size={24} className="header-icon" />
            Shared Files
          </h1>
          <div className="shared-actions">
            <div className="new-button-container">
              <button 
                className="new-button"
                onClick={() => setShowNewMenu(!showNewMenu)}
              >
                <span>New</span>
                <span>+</span>
              </button>
              {showNewMenu && (
                <div className="new-menu">
                  <button onClick={() => handleNewClick("video")}>
                    <FiFilm size={16} />
                    Generate video
                  </button>
                  <button onClick={() => handleNewClick("image")}>
                    <FiImage size={16} />
                    Generate image
                  </button>
                  <button onClick={() => handleNewClick("audio")}>
                    <FiMusic size={16} />
                    Generate audio
                  </button>
                </div>
              )}
            </div>
            <div className="view-controls">
              <button 
                className={`view-toggle ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
                title="Grid view"
              >
                <FiGrid size={18} />
              </button>
              <button 
                className={`view-toggle ${viewMode === "list" ? "active" : ""}`}
                onClick={() => setViewMode("list")}
                title="List view"
              >
                <FiList size={18} />
              </button>
            </div>
            <div className="view-options">
              <button 
                className={`view-option ${activeTab === "all" ? "active" : ""}`}
                onClick={() => setActiveTab("all")}
              >
                All
              </button>
              <button 
                className={`view-option ${activeTab === "document" ? "active" : ""}`}
                onClick={() => setActiveTab("document")}
              >
                Documents
              </button>
              <button 
                className={`view-option ${activeTab === "image" ? "active" : ""}`}
                onClick={() => setActiveTab("image")}
              >
                Images
              </button>
              <button 
                className={`view-option ${activeTab === "video" ? "active" : ""}`}
                onClick={() => setActiveTab("video")}
              >
                Videos
              </button>
            </div>
          </div>
        </div>

        <div className="shared-content">
          <div className="files-section">
            <div className="section-header">
              <h2>Files</h2>
              <div className="sort-options">
                <span>Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="date">Date modified</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>

            {sortedFiles.length === 0 ? (
              <div className="empty-state">
                <p>No {activeTab === "all" ? "" : activeTab} files found</p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="files-grid">
                {sortedFiles.map(file => (
                  <div key={file.id} className="file-card">
                    <div className="file-icon">
                      {getFileIcon(file.type)}
                    </div>
                    <div className="file-info">
                      <h3>{file.name}</h3>
                      <p className="file-meta">
                        <span>Shared by: {file.sharedBy}</span>
                        <span>Modified: {file.modified}</span>
                      </p>
                    </div>
                    <button 
                      className="file-actions"
                      onClick={() => console.log(`Actions for ${file.name}`)}
                    >
                      <FiMoreVertical size={18} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="files-list">
                {sortedFiles.map(file => (
                  <div key={file.id} className="file-row">
                    <div className="file-icon">
                      {getFileIcon(file.type)}
                    </div>
                    <div className="file-info">
                      <h3>{file.name}</h3>
                      <p>Shared by: {file.sharedBy}</p>
                    </div>
                    <div className="file-modified">
                      {file.modified}
                    </div>
                    <button 
                      className="file-actions"
                      onClick={() => console.log(`Actions for ${file.name}`)}
                    >
                      <FiMoreVertical size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="recent-section">
            <h2>Recently Accessed</h2>
            {recentFiles.length === 0 ? (
              <div className="empty-state">
                <p>No recent files</p>
              </div>
            ) : (
              <div className="recent-list">
                {recentFiles.map(file => (
                  <div key={file.id} className="recent-item">
                    <div className="recent-icon">
                      {file.icon}
                    </div>
                    <div className="recent-info">
                      <h3>{file.name}</h3>
                      <p>Accessed: {file.accessed}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Shared;