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

function SearchBar({ setExerciseId, wordEntered, setWordEntered }) {
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
      <div className="searchInputs">
        <IonInput
          type="text"
          placeholder="search"
          value={wordEntered}
          onIonChange={handleFilter}
        />
      </div>
      {filteredData.length != 0 && (
        <div
          ref={(element) => (dataContainer = element)}
          className="dataResult"
        >
          {filteredData.slice(0, 50).map((value, key) => {
            return (
              <ion-item
                class="name"
                key={key}
                onClick={() => {
                  setWordEntered(value.name);
                  setExerciseId(value.id);
                  dataContainer.style.display = "none";
                }}
              >
                <ion-label>{value.name}</ion-label>
              </ion-item>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;