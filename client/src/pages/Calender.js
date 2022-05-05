import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../components/contexts/AuthContext";

import "../theme/Calender.css";

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
  IonCard,
  IonInput,
  IonButton,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonHeader,
  IonToolbar,
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
function Calender() {
  const { currentUser } = useAuth();
  const userEvents = currentUser.calenders.map((event) => {
    event.start = convertToDate(event.start);
    event.end = convertToDate(event.end);
    return event;
  });

  function convertToDate(timeString) {
    return new Date(Date.parse(timeString));
  }

  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    workoutId: "",
  });
  const [allEvents, setAllEvents] = useState(userEvents);
  console.log(newEvent.workoutId);

  function handleAddEvent() {
    fetch("/api/calenders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: currentUser.id,
        workout_id: newEvent.workoutId,
        title: newEvent.title,
        start: newEvent.start,
        end: newEvent.end,
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
        <div className="date-picker-container">
          <div className="date-picker-form">
            <h1 className="title">Calendar</h1>
            <h3>Add New Event</h3>

            <IonInput
              className="input"
              type="text"
              placeholder="Add Title"
              // style={{ width: "20%", marginRight: "10px" }}
              value={newEvent.title}
              onIonChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
            />
            <IonItem>
              <IonLabel>Workout</IonLabel>
              <IonSelect
                value={newEvent.workoutId}
                onIonChange={(e) =>
                  setNewEvent({ ...newEvent, workoutId: e.target.value })
                }
              >
                {currentUser.workouts?.map((workout) => {
                  return (
                    <IonSelectOption key={workout.id} value={workout.id}>
                      {workout.name}
                    </IonSelectOption>
                  );
                })}
              </IonSelect>
            </IonItem>
            <DatePicker
              placeholderText="Start Date"
              style={{ marginRight: "10px" }}
              selected={newEvent.start}
              showTimeSelect
              dateFormat="Pp"
              onChange={(start) => {
                console.log(start);

                setNewEvent({ ...newEvent, start });
              }}
            />
            <DatePicker
              placeholderText="End Date"
              selected={newEvent.end}
              onChange={(end) => setNewEvent({ ...newEvent, end })}
              showTimeSelect
              dateFormat="Pp"
            />
            <IonButton stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
              Add Event
            </IonButton>
          </div>
        </div>

        <Calendar
          localizer={localizer}
          events={allEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, margin: "50px" }}
        />
      </IonContent>
    </IonPage>
  );
}

export default Calender;
