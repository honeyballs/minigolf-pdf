import React, { Component } from "react";
import Sidebar from "./components/Sidebar";
import "./App.css";

class App extends Component {
  initialState = {
    data: [{"anlage": "Freibad Wetzlar","datum": "2018-02-27","spieler" : "Karl Maier","bahnen": [1,1,2, 2,2,4, 2,2,2, 2,3,3, 3,3,1, 3,3,3]},{"anlage": "SG Arheilgen Miniaturgolf","datum": "2017-09-25","spieler" : "Johanna Jung","bahnen": [1,2,1, 1,1,1, 1,2,1, 1,1,1, 2,1,2, 1,5,2]}, { "anlage": "SG Arheilgen Miniaturgolf", "datum": "2017-09-25", "spieler" : "Johanna Jung", "bahnen": [2,2,1, 1,2,1, 1,1,1, 2,1,1, 2,2,1, 1,2,1] }, { "anlage": "SG Arheilgen Miniaturgolf", "datum": "2017-09-25", "spieler" : "Johanna Jung", "bahnen": [1,2,2, 1,1,1, 1,1,1, 1,1,1, 1,2,2, 1,1,2] }, { "anlage": "SG Arheilgen Miniaturgolf", "datum": "2017-09-25", "spieler" : "Johanna Jung", "bahnen": [1,2,2, 1,1,1, 1,1,1, 1,2,1, 1,1,1, 1,1,2] }, { "anlage": "SG Arheilgen Miniaturgolf", "datum": "2017-09-25", "spieler" : "Selina Krauss", "bahnen": [1,3,2, 1,1,1, 1,1,1, 1,1,1, 1,1,1, 1,1,1] }, { "anlage": "SG Arheilgen Miniaturgolf", "datum": "2017-09-25", "spieler" : "Selina Krauss", "bahnen": [3,2,2, 1,5,2, 1,1,1, 1,1,1, 1,1,1, 1,1,1] }, { "anlage": "SG Arheilgen Miniaturgolf", "datum": "2017-09-25", "spieler" : "Marcel Staudt", "bahnen": [1,3,2, 1,1,1, 1,1,1, 1,2,1, 1,2,2, 2,5,1] }, { "anlage": "SG Arheilgen Miniaturgolf", "datum": "2017-09-25", "spieler" : "Marcel Staudt", "bahnen": [2,2,2, 2,1,2, 1,4,1, 1,2,1, 2,1,1, 1,1,1] }],
    fileName: false,
    fileError: false,
    selectedAnlagen: [],
    selectedSpieler: [],
    selectedBahnen: [],
    selectedStatistics: []
  };
  state = this.initialState;


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
          
          selectedStatistics={this.state.selectedStatistics}
          handleStatisticsChange={this.handleStatisticsChange}
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
  
  handleStatisticsChange = value => {
    this.setState({ selectedStatistics: value });
  }

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
