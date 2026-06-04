import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import EventPlanner from "./model/EventPlanner.js";
import EventListSection from "./components/EventListSection.jsx";
import SearchBar from "./components/SearchBar.jsx";
import { mockEvents } from "./data/MockEvents.js";
import PageHeader from "./components/PageHeader.jsx";
import FooterNote from "./components/FooterNote.jsx";
import EventInput from "./components/EventInput.jsx";
import SortButton from "./components/SortButton.jsx";
import { OfflineBanner } from "./components/OfflineBanner.tsx";

export default function App() {
  const [eventPlanner] = useState(() => {
    const planner = new EventPlanner();
    mockEvents.forEach((event) => {
      planner.addEvent(
        event.name,
        event.date,
        event.location,
        event.time,
        event.description,
        event.completed,
      );
    });
    return planner;
  });

  const [events, setEvents] = useState(() => [...eventPlanner.getAllEvents()]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);

  //adds a new event to the planner and updates the state to reflect the change
  function handleAddEvent(eventData) {
    const trimmedName =
      typeof eventData.name === "string" ? eventData.name.trim() : "";
    if (!trimmedName) return;

    //adds an event with default values for date, location, time, and description if they are not provided by the user
    eventPlanner.addEvent(
      trimmedName,
      eventData.date ? eventData.date : new Date(),
      eventData.location || "TBD",
      eventData.time || "TBD",
      eventData.description || "User added event",
      eventData.completed || false,
    );

    setEvents([...eventPlanner.getAllEvents()]);
  }

  //sets editing state for each event
  function handleEditEvent(event) {
    setEditingEvent(event);
  }

  //updates the event with the new data, using the original values for any fields that were left blank in the form
  function handleUpdateEvent(eventData) {
    if (!editingEvent) return;

    eventPlanner.updateEvent(
      editingEvent.name,
      eventData.name,
      eventData.date ? new Date(eventData.date) : editingEvent._date,
      eventData.location,
      eventData.time,
      eventData.description,
      eventData.completed,
    );

    setEvents([...eventPlanner.getAllEvents()]);
    setEditingEvent(null);
  }

  //removes the event from the planner and updates the state to reflect the change
  function handleDeleteEvent(event) {
    eventPlanner.removeEvent(event.name);
    setEvents([...eventPlanner.getAllEvents()]);
  }

  //toggles the completed status of the event and updates the state to reflect the change
  function handleToggleCompleted(event) {
    eventPlanner.toggleEventCompleted(event.name);
    setEvents([...eventPlanner.getAllEvents()]);
  }

  //clears the editing event state to hide the edit form without making any changes to the event
  function handleCancelEdit() {
    setEditingEvent(null);
  }

  //sorts the events by date in chronological order and updates the state to reflect the change
  function handleSortByDate() {
    eventPlanner.sortEventsByDate();
    setEvents([...eventPlanner.getAllEvents()]);
  }

  //sorts the events by complete status with incomplete events first and updates the state to reflect the change
  function handleSortByDone() {
    eventPlanner.sortEventsByDone();
    setEvents([...eventPlanner.getAllEvents()]);
  }

  //renders the app with a header, search bar, event list, and input form, passing the necessary data and event handlers as props to the child components
  return (
    <div className="page-shell">

    {/* displays an offline banner at the top of the page when the user is not connected to the internet */}
      <OfflineBanner />

      <PageHeader
        title="Event Planner"
        subtitle="Plan your events and keep track of everything you need to do."
      />

      {/* sorts events by date in chronological order when the button is clicked */}
      <button className="sort-btn" onClick={handleSortByDate}>
        Sort Events by Date (Default)
      </button>
      <br></br>

      {/* sorts events by completion status when the button is clicked */}
      <button className="sort-btn" onClick={handleSortByDone}>
        Sort Events by Done Status
      </button>
      <br></br>

      {/* displays the events and a search bar */}
      <main className="content-stack">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <EventListSection
          heading="Upcoming Events"
          events={events.filter((e) => {
            const q = searchQuery.trim().toLowerCase();
            if (!q) return true;
            const name = (e.name || "").toString().toLowerCase();
            const location = (e.location || "").toString().toLowerCase();
            const description = (e.description || "").toString().toLowerCase();
            const time = (e.time || "").toString().toLowerCase();
            return (
              name.includes(q) ||
              location.includes(q) ||
              description.includes(q) ||
              time.includes(q)
            );
          })}
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
          onToggleCompleted={handleToggleCompleted}
        />

        <EventInput
          onAddEvent={handleAddEvent}
          onUpdateEvent={handleUpdateEvent}
          onCancelEdit={handleCancelEdit}
          eventToEdit={editingEvent}
        />
      </main>

      <FooterNote note="© 2026 Event Planner. All rights reserved." />
    </div>
  );
}
