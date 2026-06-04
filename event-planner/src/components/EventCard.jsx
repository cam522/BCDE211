export default function EventCard({
  name,
  date,
  location,
  time,
  description,
  completed,
  onEdit,
  onDelete,
  onToggleCompleted,
}) {
  return (
    <article className="card">
      <div className="card-top-row">
        <h3>{name}</h3>
        <button 
          onClick={onToggleCompleted} 
          className={`status-badge ${completed ? 'completed' : 'pending'}`}
        >
          {completed ? 'Done' : 'Pending'}
        </button>
      </div>

      <p>
        <strong>Date:</strong> {date}
      </p>
      <p>
        <strong>Location:</strong> {location}
      </p>
      <p>
        <strong>Time:</strong> {time}
      </p>
      <p>
        <strong>Description:</strong> {description}
      </p>
      <div className="card-actions">
        <button onClick={onEdit} className="edit-btn">Edit</button>
        <button onClick={onDelete} className="delete-btn">Delete</button>
      </div>
    </article>
  );
}