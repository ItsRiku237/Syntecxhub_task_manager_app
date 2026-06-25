import { Plus, Save, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const emptyForm = {
  title: '',
  description: ''
};

const TaskForm = ({ editingTask, onCancelEdit, onSubmit, submitting }) => {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title,
        description: editingTask.description || ''
      });
      return;
    }

    setForm(emptyForm);
  }, [editingTask]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit(form);
    setForm(emptyForm);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="task-title">Title</label>
        <input
          id="task-title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          placeholder="Plan the next sprint"
          maxLength={100}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="task-description">Description</label>
        <textarea
          id="task-description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Add useful details"
          maxLength={500}
          rows={4}
        />
      </div>

      <div className="form-actions">
        <button type="submit" disabled={submitting}>
          {editingTask ? <Save size={18} /> : <Plus size={18} />}
          <span>{editingTask ? 'Save Task' : 'Create Task'}</span>
        </button>

        {editingTask && (
          <button type="button" className="secondary-button" onClick={onCancelEdit}>
            <X size={18} />
            <span>Cancel</span>
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
