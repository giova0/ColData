import React, { Component } from "react";
import ReactDOM from "react-dom";
import { CarsTable } from "./CarsTable";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "./styles.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <CarsTable />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
