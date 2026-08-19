import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getMessages,
  deleteMessage,
} from '../services/api';
import { useAuth } from '../context/AuthContext';

const emptyForm = {
  title: '',
  description: '',
  techStack: '',
  imageUrl: '',
  githubLink: '',
  liveLink: '',
};

const AdminDashboard = () => {
  const [tab, setTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState('');
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const loadProjects = async () => {
    const { data } = await getProjects();
    setProjects(data);
  };

  const loadMessages = async () => {
    const { data } = await getMessages();
    setMessages(data);
  };

  useEffect(() => {
    loadProjects();
    loadMessages();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('saving');
    try {
      const payload = {
        ...form,
        techStack: form.techStack
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      };

      if (editingId) {
        await updateProject(editingId, payload);
      } else {
        await createProject(payload);
      }

      resetForm();
      setStatus('');
      loadProjects();
    } catch {
      setStatus('error');
    }
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setForm({
      title: project.title || '',
      description: project.description || '',
      techStack: (project.techStack || []).join(', '),
      imageUrl: project.imageUrl || '',
      githubLink: project.githubLink || '',
      liveLink: project.liveLink || '',
    });
    setTab('projects');
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    await deleteProject(id);
    loadProjects();
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    await deleteMessage(id);
    loadMessages();
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <section className="admin-dashboard">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <div>
          <span style={{ marginRight: '1rem', color: 'var(--text-muted)' }}>
            Hi, {admin?.username}
          </span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="admin-tabs">
        <button
          className={tab === 'projects' ? 'active' : ''}
          onClick={() => setTab('projects')}
        >
          Projects ({projects.length})
        </button>
        <button
          className={tab === 'messages' ? 'active' : ''}
          onClick={() => setTab('messages')}
        >
          Messages ({messages.length})
        </button>
      </div>

      {tab === 'projects' && (
        <>
          <form onSubmit={handleSubmit} className="contact-form admin-form">
            <h3>{editingId ? 'Edit Project' : 'Add Project'}</h3>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              rows="3"
              value={form.description}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="techStack"
              placeholder="Tech stack (comma separated: React, Node, MongoDB)"
              value={form.techStack}
              onChange={handleChange}
            />
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              value={form.imageUrl}
              onChange={handleChange}
            />
            <input
              type="text"
              name="githubLink"
              placeholder="GitHub Link"
              value={form.githubLink}
              onChange={handleChange}
            />
            <input
              type="text"
              name="liveLink"
              placeholder="Live Demo Link"
              value={form.liveLink}
              onChange={handleChange}
            />
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" disabled={status === 'saving'}>
                {editingId ? 'Update Project' : 'Add Project'}
              </button>
              {editingId && (
                <button type="button" className="btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
              )}
            </div>
            {status === 'error' && (
              <p className="status-message error">Something went wrong.</p>
            )}
          </form>

          <div className="admin-projects-list">
            <h3>Existing Projects</h3>
            {projects.length === 0 && (
              <p className="status-message">No projects yet.</p>
            )}
            {projects.map((project) => (
              <div key={project._id} className="admin-project-row">
                <span>{project.title}</span>
                <div>
                  <button onClick={() => handleEdit(project)}>Edit</button>
                  <button onClick={() => handleDeleteProject(project._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'messages' && (
        <div className="admin-messages-list">
          <h3>Contact Messages</h3>
          {messages.length === 0 && (
            <p className="status-message">No messages yet.</p>
          )}
          {messages.map((msg) => (
            <div key={msg._id} className="admin-message-row">
              <div>
                <div className="admin-message-meta">
                  <strong>{msg.name}</strong> &middot; {msg.email} &middot;{' '}
                  {formatDate(msg.createdAt)}
                </div>
                <p className="admin-message-body">{msg.message}</p>
              </div>
              <button
                className="btn-danger"
                onClick={() => handleDeleteMessage(msg._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminDashboard;
