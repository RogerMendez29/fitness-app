import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import "./App.css";

import {
  IonPage,
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  IonContent,
} from "@ionic/react";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});




function Calender({ currentUser }) {
  console.log(currentUser.calenders);

  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(currentUser.calenders);

  

  function handleAddEvent() {
    fetch("/api/calenders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: currentUser.id,
        workout_id: 1,
        title: newEvent.title,
        start_date: newEvent.start,
        end_date: newEvent.end,
      }),
    }).then((res) => {
      if (res.ok) {
        res.json();
        setAllEvents([...allEvents, newEvent]);
      }
    });
  }

  return (
    <IonPage>
      <IonContent>
        <h1>Calendar</h1>
        <h2>Add New Event</h2>
        <div>
          <input
            type="text"
            placeholder="Add Title"
            style={{ width: "20%", marginRight: "10px" }}
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
          />
          <DatePicker
            placeholderText="Start Date"
            style={{ marginRight: "10px" }}
            selected={newEvent.start}
            onChange={(start) => {
              setNewEvent({ ...newEvent, start });
            }}
          />
          <DatePicker
            placeholderText="End Date"
            selected={newEvent.end}
            onChange={(end) => setNewEvent({ ...newEvent, end })}
          />
          <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
            Add Event
          </button>
        </div>
        <Calendar
          localizer={localizer}
          events={allEvents}
          startAccessor="start_date"
          endAccessor="end_date"
          style={{ height: 500, margin: "50px" }}
        />
      </IonContent>
    </IonPage>
  );
}

export default Calender;
