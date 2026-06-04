class Event {

    //constructor takes a name, date, and location and creates an event object with those properties
    constructor(newName, newDate, newLocation, newTime, newDescription, newCompleted = false) {
        this.name = newName;
        this._date = newDate;
        this.location = newLocation;
        this.time = newTime;
        this.description = newDescription;
        this.completed = newCompleted;
    }

    //formats the date as dd/mm/yyyy when accessed
    get date() {
        const day = String(this._date.getDate()).padStart(2, '0');
        const month = String(this._date.getMonth() + 1).padStart(2, '0');
        const year = this._date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    //toggles the completed status of the event
    toggleCompleted() {
        this.completed = !this.completed;
    }
}

export default Event;
