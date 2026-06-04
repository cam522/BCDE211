import React from "react";

export default function EventInput({ onAddEvent, onUpdateEvent, onCancelEdit, eventToEdit }) {
  const [name, setName] = React.useState("");
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [completed, setCompleted] = React.useState(false);

  React.useEffect(() => {
    if (eventToEdit) {
      setName(eventToEdit.name || "");
      setDate(eventToEdit._date ? eventToEdit._date.toISOString().split('T')[0] : "");
      setTime(eventToEdit.time || "");
      setLocation(eventToEdit.location || "");
      setDescription(eventToEdit.description || "");
      setCompleted(eventToEdit.completed || false);
    } else {
      setName("");
      setDate("");
      setTime("");
      setLocation("");
      setDescription("");
      setCompleted(false);
    }
  }, [eventToEdit]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!name.trim()) return;

    const eventData = {
      name: name.trim(),
      date,
      time,
      location: location.trim(),
      description: description.trim(),
      completed,
    };

    if (eventToEdit) {
      onUpdateEvent(eventData);
    } else {
      onAddEvent(eventData);
      setName("");
      setDate("");
      setTime("");
      setLocation("");
      setDescription("");
    }
  }

  return (
    <form className="event-input" onSubmit={handleSubmit}>
      <h2>{eventToEdit ? "Edit Event" : "Add an Event"}</h2>

      <label>
        Event Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter event name"
          required
        />
      </label>

      <label>
        Date
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>

      <label>
        Time (Enter in 12hr format)
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </label>

      <label>
        Location
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
        />
      </label>

      <label>
        Description
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter event description"
          rows={3}
        />
      </label>

      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        Mark as completed
      </label>

      <div className="form-actions">
        <button type="submit">{eventToEdit ? "Update Event" : "Add Event"}</button>
        {eventToEdit && <button type="button" onClick={onCancelEdit} className="cancel-btn">Cancel</button>}
      </div>
    </form>
  );
}
