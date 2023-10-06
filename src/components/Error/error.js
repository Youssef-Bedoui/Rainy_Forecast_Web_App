import React from "react";
import "./error.css";
import SignalWifiConnectedNoInternet4SharpIcon from "@mui/icons-material/SignalWifiConnectedNoInternet4Sharp";
import LoopIcon from "@mui/icons-material/Loop";
function Error({ error, connecProb, fetch }) {
  if (!error) {
    return null;
  }

  return (
    <div className="error-overlay">
      <div className="error-container">
        <div className="error-message text-center">
          {connecProb && (
            <SignalWifiConnectedNoInternet4SharpIcon className="me-3 fs-2" />
          )}
          {error}
        </div>
        {connecProb && <LoopIcon className="refresh_connec fs-1" onClick={()=>fetch()}/>}
      </div>
    </div>
  );
}

export default Error;
