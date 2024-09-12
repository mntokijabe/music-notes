import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';

const CLIENT_ID = '577172681111-0snmr40allqkqe17t8a00b1oj3c7qmeo.apps.googleusercontent.com'; // Replace with your client ID
const API_KEY = 'AIzaSyATUXoxPTDmKLICxF4gt4fSnaFm91f4A8g'; // Replace with your API key
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

const GoogleCalendar = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Load the Google API Script
    const initClient = () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(() => {
          // Listen for sign-in state changes
          const authInstance = gapi.auth2.getAuthInstance();
          setIsSignedIn(authInstance.isSignedIn.get());
          authInstance.isSignedIn.listen(setIsSignedIn);

          // If user is signed in, load calendar events
          if (authInstance.isSignedIn.get()) {
            listUpcomingEvents();
          }
        });
    };

    gapi.load('client:auth2', initClient);
  }, []);

  // Function to handle login
  const handleLogin = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  // Function to handle logout
  const handleLogout = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

  // Function to list upcoming calendar events
  const listUpcomingEvents = () => {
    gapi.client.calendar.events
      .list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: 'startTime',
      })
      .then((response) => {
        const events = response.result.items;
        setEvents(events);
      });
  };

  return (
    <div>
      {isSignedIn ? (
        <div>
          <button onClick={handleLogout}>Sign Out</button>
          <h2>Upcoming Events</h2>
          <ul>
            {events.length ? (
              events.map((event) => (
                <li key={event.id}>
                  {event.summary} - {event.start.dateTime || event.start.date}
                </li>
              ))
            ) : (
              <li>No upcoming events</li>
            )}
          </ul>
        </div>
      ) : (
        <button onClick={handleLogin}>Sign In with Google</button>
      )}
    </div>
  );
};

export default GoogleCalendar;
