import React, { Component } from 'react';
import Sidebar from "./components/Sidebar";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Sidebar />
        <div id="pdf"></div>
      </div>
    );
  }
}

export default App;
