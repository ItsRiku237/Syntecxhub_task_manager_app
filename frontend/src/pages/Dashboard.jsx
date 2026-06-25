import { useEffect, useMemo, useState } from 'react';
import api from '../api/axios.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import TaskForm from '../components/TaskForm.jsx';
import TaskItem from '../components/TaskItem.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const stats = useMemo(() => {
    const completed = tasks.filter((task) => task.completed).length;
    return {
      total: tasks.length,
      completed,
      open: tasks.length - completed
    };
  }, [tasks]);

  const fetchTasks = async () => {
    setLoading(true);
    setError('');

    try {
      const { data } = await api.get('/tasks');
      setTasks(data.tasks);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    setError('');

    try {
      if (editingTask) {
        const { data } = await api.patch(`/tasks/${editingTask._id}`, payload);
        setTasks((current) =>
          current.map((task) => (task._id === data.task._id ? data.task : task))
        );
        setEditingTask(null);
        return;
      }

      const { data } = await api.post('/tasks', payload);
      setTasks((current) => [data.task, ...current]);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save task');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (task) => {
    try {
      const { data } = await api.patch(`/tasks/${task._id}`, {
        completed: !task.completed
      });
      setTasks((current) =>
        current.map((item) => (item._id === data.task._id ? data.task : item))
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update task');
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks((current) => current.filter((task) => task._id !== taskId));
      if (editingTask?._id === taskId) {
        setEditingTask(null);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Could not delete task');
    }
  };

  return (
    <section className="dashboard">
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">Signed in as {user.email}</p>
          <h1>{user.name}'s Tasks</h1>
        </div>
        <div className="stats-grid" aria-label="Task statistics">
          <div>
            <strong>{stats.total}</strong>
            <span>Total</span>
          </div>
          <div>
            <strong>{stats.open}</strong>
            <span>Open</span>
          </div>
          <div>
            <strong>{stats.completed}</strong>
            <span>Done</span>
          </div>
        </div>
      </div>

      {error && <div className="alert">{error}</div>}

      <div className="dashboard-grid">
        <aside className="panel">
          <h2>{editingTask ? 'Edit Task' : 'New Task'}</h2>
          <TaskForm
            editingTask={editingTask}
            onCancelEdit={() => setEditingTask(null)}
            onSubmit={handleSubmit}
            submitting={submitting}
          />
        </aside>

        <section className="panel task-list-panel">
          <h2>Task List</h2>
          {loading ? (
            <LoadingSpinner />
          ) : tasks.length ? (
            <div className="task-list">
              {tasks.map((task) => (
                <TaskItem
                  key={task._id}
                  task={task}
                  onDelete={handleDelete}
                  onEdit={setEditingTask}
                  onToggle={handleToggle}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">No tasks yet.</div>
          )}
        </section>
      </div>
    </section>
  );
};

export default Dashboard;
