import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { Hop } from '@onehop/js';
import { hop } from "@onehop/client";
 
const myToken = 'ptk_c19iOTA0MDIyODEyOGJlM2NiMWZjZWVlMTUwY2Q2MjQ1MV81MDczNDg0NTkwMTQzODk5NA';
// Export the Hop SDK instance so you can use it throughout your codebase
export const hopServer = new Hop(myToken);

// Example: Creating a project secret
hopServer.projects.secrets.create(
	'RANDOM_NUMBER',
	Math.floor(Math.random() * 100).toString(),
);
hop.init({
	projectId: "project_NTAyODgyMjAwMTY4OTQyNDI" // replace with your project ID
});


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
