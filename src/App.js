import React, { Component } from "react";
import Sidebar from "./components/Sidebar";
import "./App.css";

class App extends Component {
  initialState = {
    data: [],
    fileName: false,
    fileError: false,
    selectedAnlagen: [],
    selectedSpieler: [],
    selectedBahnen: []
  };
  state = this.initialState

  render() {
    return (
      <div className="App">
        <Sidebar
          loadFile={this.loadFile}
          data={this.state.data}
          fileName={this.state.fileName}
          fileError={this.state.fileError}
          selectedAnlagen={this.state.selectedAnlagen}
          handleAnlagenChange={this.handleAnlagenSelectChange}
          selectedSpieler={this.state.selectedSpieler}
          handleSpielerChange={this.handleSpielerSelectChange}
          selectedBahnen={this.state.selectedBahnen}
          handleBahnenChange={this.handleBahnenSelectChange}
        />
        <div id="pdf-container">
          <div id="pdf">
            {this.state.data.map(item => <p>{item.spieler}</p>)}
          </div>
        </div>
      </div>
    );
  }

  handleAnlagenSelectChange = value => {
    this.setState({ selectedAnlagen: value });
  };

  handleSpielerSelectChange = value => {
    this.setState({ selectedSpieler: value });
  };

  handleBahnenSelectChange = value => {
    this.setState({ selectedBahnen: value });
  };

  loadFile = files => {
    if (!files.length) {
      this.setState({...this.initialState, fileError: 'something went wrong during file upload!'});
      return;
    }
    let file = files[0];
    if (!file.name.endsWith(".json")) {
      this.setState({...this.initialState, fileError: 'uploaded file is not a .json file!'});
      return;
    }
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      let reader = new FileReader();
      reader.onload = () => {
        try {
          let data = JSON.parse(reader.result);
          this.setState({
            data: data,
            fileName: file.name,
            fileError: false,
            selectedAnlagen: [],
            selectedSpieler: [],
            selectedBahnen: [] });
        } catch (err) {
          this.setState({...this.initialState, fileError: 'error parsing the json! (check https://jsonlint.com/)'});
        }
      };
      reader.readAsText(file);
    } else {
      this.setState({...this.initialState, fileError: 'the file APIs are not fully supported in this browser!'});
    }
  };
}

export default App;
