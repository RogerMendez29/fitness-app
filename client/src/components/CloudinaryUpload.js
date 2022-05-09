import React, { useEffect } from "react";
import { IonButton } from "@ionic/react";

function CloudinaryUpload({ preset, handleUpload, user }) {
  useEffect(() => {
    window.myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dhzstgmsp",
        uploadPreset: preset,
        prepareUploadParams: (cb, params) => {
          params = [].concat(params); //params can be a single object or an array of objects
          Promise.all(
            params.map((body) => {
              return fetch("/api/uploads/prepare", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
              }).then((res) => res.json());
            })
          ).then((results) => cb(results.length === 1 ? results[0] : results));
        },
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          handleUpload && handleUpload(result);
          window.myWidget.close();
        }
      }
    );
    if (user) {
      return null;
    } else {
      return document.getElementById("upload").addEventListener(
        "click",
        function () {
          window.myWidget.open();
        },
        false
      );
    }
  }, [preset, handleUpload]);

  return (
    <div className="btn-container">
      {user ? null : (
        <IonButton size="small" id="upload" style={{margin:"5%"}}>
          Upload
        </IonButton>
      )}
    </div>
  );
}

export default CloudinaryUpload;
