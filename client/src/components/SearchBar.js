import React, { useState } from "react";
import "../theme/SearchBar.css";
import { useAuth } from "./contexts/AuthContext";
import { ellipse, square, triangle } from "ionicons/icons";
import {
  IonInput,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonItem,
  IonLabel,
  IonTitle,
  IonSelectOption,
  IonSelect,
  IonTextarea,
  IonIcon,
  IonSearchbar,
} from "@ionic/react";

function SearchBar({ setExerciseId, wordEntered, setWordEntered, exerciseId }) {
  const { exercises } = useAuth();
  const [filteredData, setFilteredData] = useState([]);

  let dataContainer;

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = exercises.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  return (
    <div className="search">
      <div className="search-input">
        <IonSearchbar
          className=""
          type="text"
          placeholder="search"
          value={wordEntered}
          onIonChange={handleFilter}
          required
        />
      </div>
      {filteredData.length != 0 && (
        <div
          ref={(element) => (dataContainer = element)}
          className="dataResult"
        >
          {filteredData.slice(0, 150).map((value, key) => {
            return (
              <IonItem
                class="name"
                key={key}
                onClick={() => {
                  setWordEntered(value.name);
                  setExerciseId(value.id);
                  dataContainer.style.display = "none";
                }}
              >
                <ion-label>{value.name}</ion-label>
              </IonItem>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
