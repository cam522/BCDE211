# Event Planner
This project is for BCDE211 Best Programming Practices (Web and Mobile development) at Ara Institute of Canterbury. It combines work from two assessments to create a Progressive Web App (PWA) for a event planner application.

## Course Infomation:
* Course: BCDE211 Best Programming Practices (Web and Mobile Development)
* Semester: One 2026

## Project Overview:
This app helps people to create and track events. The project was made in two parts:
1. Model - Assessment 2: This was made using JavaScript and involved creating a structure for the program which handles all events.
2. UI/View - Assessment 3: This was made using React and handles how the user interacts with the program.
The final app is a completed event planner where userss can add, edit, delete, or view all their upcoming events.

## Key features:
### Add events:
The form at the bottom of the page must have a name but will provide default values if no data is entered for the other fields. The date and time are only able to be entered in their respected formats, the time should be entered in 12hr format only.

### Delete events:
Click the 'Delete' button on the event you wish to delete.

### Edit events:
Click the 'Edit' button on the event you wish to edit and then you can edit the details in the form at the bottom of the page or cancel the edit.

### Search bar:
To use the search bar type in the name/location/description/time of the event you want to find and the app will return all events with those characters.

### Sort events by date or status:
The 'Sort Events by Date' button sorts events by date in chronological order. Whereas the 'Sort Events by Done Status' button sorts events by their completed status with non complete/pending events display first.

## Technologies used:
- **Frontend:** React.js
- **Build Tool:** Vite
- **Testing:** Jest
- **Linting:** ESLint
- **Language:** JavaScript
- **Styling:** CSS
- **PWA:** Service Workers, Web App Manifest

## Setup instructions:
1. Ensure you are in the project directory.
2. To install the 'node_modules' folder run:
`npm update`
3. To run the program in development mode run:
`npm run dev`

## Known bugs/errors:
The webpage loads with an error for the favicon.ico:1 file. This DOES NOT affect the program and can be solved by refreshing the browser.

## Mock data:
The mock 'data' is located in the data folder. This contains some mock data.