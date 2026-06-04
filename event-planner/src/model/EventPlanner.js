import Event from './Event.js';

class EventPlanner {
    constructor() {

        //sets the all my events array to enpty at the start of the program
        this.allMyEvents = [];

        //stores the last updated event seperate incase of reverting changes
        this._lastUpdate = null;
    }

    //adds a new event to the all my events array with the given name, date, and location
    //if any input is missing/invalid, the event will use default values
    addEvent(newName, newDate, newLocation, newTime, newDescription, newCompleted = false) {
        //validate name
        const validatedName = typeof newName === 'string' && newName.trim() ? newName.trim() : "Untitled Event";

        //validate location
        const validatedLocation =
            typeof newLocation === 'string' && newLocation.trim() ? newLocation.trim() : "Unknown Location";

        //validate description
        const validatedDescription =
            typeof newDescription === 'string' && newDescription.trim() ? newDescription.trim() : "No description provided";

        //validate time
        const validatedTime =
            typeof newTime === 'string' && newTime.trim() ? newTime.trim() : "00:00";
            
        //validate date and return a Date object, or null if invalid
        const validatedDate = (() => {
            let dateObj = null;

            //if the data is not a number use the current date as a default value, otherwise try to parse the date
            if (newDate instanceof Date && !Number.isNaN(newDate.getTime())) {
                dateObj = newDate;
            } else if (typeof newDate === 'string') {
                const normalized = newDate.trim();
                if (/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
                    dateObj = new Date(normalized + 'T00:00:00');
                } else if (/^\d{2}\/\d{2}\/\d{4}$/.test(normalized)) {
                    const [day, month, year] = normalized.split('/');
                    dateObj = new Date(`${year}-${month}-${day}T00:00:00`);
                } else if (/^\d{2}-\d{2}-\d{4}$/.test(normalized)) {
                    const [day, month, year] = normalized.split('-');
                    dateObj = new Date(`${year}-${month}-${day}T00:00:00`);
                }
            }

            //if the date is invalid, return null
            if (!dateObj || Number.isNaN(dateObj.getTime())) {
                return null;
            }

            return dateObj;
        })();

        //only add event if all parts are valid
        if (!validatedName || !validatedDate || !validatedLocation || !validatedTime || !validatedDescription) return;

        const newEvent = new Event(validatedName, validatedDate, validatedLocation, validatedTime, validatedDescription, newCompleted);
        this.allMyEvents.push(newEvent);
    }

    //sorts the all my events array by date in ascending order
    sortEventsByDate() {
        this.allMyEvents.sort((a, b) => a._date - b._date);
    }

    //sorts the all my events array by done status by incomplete first
    sortEventsByDone() {
        this.allMyEvents.sort((a, b) => {
            if (a.completed === b.completed) return 0;
            return a.completed ? 1 : -1;
        });
    }

    //finds an event in the all my events array by its name and returns it
    findEventByName(name) {
        return this.allMyEvents.find(event => event.name === name);
    }

    //removes an event from the all my events array by its name
    removeEvent(name) {
        const event = this.findEventByName(name);
        if (event) {
            this.allMyEvents = this.allMyEvents.filter(e => e !== event);
        }
    }

    //updates an event's name, date, and location by its name and stores the previous values for potential reversion
    updateEvent(name, newName, newDate, newLocation, newTime, newDescription, newCompleted) {
        const event = this.findEventByName(name);
        if (event) {
            
            //keeps a copy of the previous values incase of revert changes
            this._lastUpdate = {
                event,
                oldName: event.name,
                oldDate: event._date,
                oldLocation: event.location,
                oldTime: event.time,
                oldDescription: event.description,
                oldCompleted: event.completed
            };

            event.name = newName;
            event._date = newDate instanceof Date ? newDate : new Date(newDate);
            event.location = newLocation;
            event.time = newTime;
            event.description = newDescription;
            event.completed = newCompleted;
        }
    }

    //reverts the last update made to an event using the previous stored values
    revertEditToEvent() {
        if (!this._lastUpdate) return;

        const { event, oldName, oldDate, oldLocation, oldTime, oldDescription, oldCompleted } = this._lastUpdate;
        event.name = oldName;
        event._date = oldDate;
        event.location = oldLocation;
        event.time = oldTime;
        event.description = oldDescription;
        event.completed = oldCompleted;

        //clears the copy once the change is undone
        this._lastUpdate = null;
    }

    //toggles the completed status of an event by name
    toggleEventCompleted(name) {
        const event = this.findEventByName(name);
        if (event) {
            event.toggleCompleted();
        }
    }

    //returns the all my events array
    getAllEvents() {
        return this.allMyEvents;
    }

}

export default EventPlanner;