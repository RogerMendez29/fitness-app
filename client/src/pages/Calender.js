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
  IonTitle,
  IonSubtitle,
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

  function handleAddEvent(e) {
    e.preventDefault();
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
            {/* <IonCard className="callender-card"> */}
            <form className="event-form" onSubmit={(e)=>handleAddEvent(e)}>
              <IonTitle
                style={{
                  marginBottom: "1.25rem",
                  fontWeight: "bold",
                  fontSize: "25px",
                }}
              >
                Calender
              </IonTitle>
              <IonTitle
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                Add New Event
              </IonTitle>

              <IonInput
                className="input"
                type="text"
                placeholder="Title"
                value={newEvent.title}
                required
                onIonChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
              />
              <IonItem className="workout-selector">
                <IonLabel>Choose One:</IonLabel>
                <IonSelect
                  className="workout-selector"
                  value={newEvent.workoutId}
                  onIonChange={(e) => {
                    setNewEvent({
                      ...newEvent,
                      workoutId: e.target.value,
                    });
                  }}
                >
                  {currentUser.workouts?.map((workout) => {
                    return (
                      <IonSelectOption
                        key={workout.id}
                        value={workout.id}
                        // value2={workout.name}
                      >
                        {workout.name}
                      </IonSelectOption>
                    );
                  })}
                </IonSelect>
              </IonItem>
              <DatePicker
                className="date-picker"
                placeholderText="Start Date"
                selected={newEvent.start}
                showTimeSelect
                dateFormat="Pp"
                onChange={(start) => {
                  console.log(start);

                  setNewEvent({ ...newEvent, start });
                }}
              />
              <DatePicker
                className="date-picker"
                placeholderText="End Date"
                selected={newEvent.end}
                onChange={(end) => setNewEvent({ ...newEvent, end })}
                showTimeSelect
                dateFormat="Pp"
              />
              <IonButton type="submit" stlye={{ marginTop: "10px" }}>
                Add Event
              </IonButton>
            </form>
            {/* </IonCard> */}
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
