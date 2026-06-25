import { CheckCircle2, Circle, Pencil, Trash2 } from 'lucide-react';

const TaskItem = ({ onDelete, onEdit, onToggle, task }) => (
  <article className={`task-item ${task.completed ? 'task-completed' : ''}`}>
    <button
      className="status-button"
      onClick={() => onToggle(task)}
      aria-label={task.completed ? 'Mark task incomplete' : 'Mark task complete'}
      title={task.completed ? 'Mark incomplete' : 'Mark complete'}
    >
      {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
    </button>

    <div className="task-content">
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}
      <span>{new Date(task.createdAt).toLocaleDateString()}</span>
    </div>

    <div className="task-actions">
      <button onClick={() => onEdit(task)} aria-label="Edit task" title="Edit task">
        <Pencil size={18} />
      </button>
      <button
        className="danger-button"
        onClick={() => onDelete(task._id)}
        aria-label="Delete task"
        title="Delete task"
      >
        <Trash2 size={18} />
      </button>
    </div>
  </article>
);

export default TaskItem;
