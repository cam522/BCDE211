import EventCard from './EventCard.jsx';

export default function EventListSection({ heading, events: eventItems, onEditEvent, onDeleteEvent, onToggleCompleted }) {
  return (
    <section className="panel">
      <h2>{heading}</h2>
    
      {eventItems.length === 0 ? (
        <p className="empty-state">No events to show yet.</p>
      ) : (
        <div className="card-grid">
          {eventItems.map((event) => (
            <EventCard
              key={event.id || event.name}
              name={event.name}
              date={event.date}
              location={event.location}
              time={event.time}
              description={event.description}
              completed={event.completed}
              onEdit={() => onEditEvent && onEditEvent(event)}
              onDelete={() => onDeleteEvent && onDeleteEvent(event)}
              onToggleCompleted={() => onToggleCompleted && onToggleCompleted(event)}
            />
          ))}
        </div>
      )}
    </section>
  );
}