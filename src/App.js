import React, { Component } from "react";
import Sidebar from "./components/Sidebar";
import PDF from './components/pdf';
import Editor from './components/Editor';

import distinctColors from 'distinct-colors';

import "./App.css";

class App extends Component {
  initialState = {
    data: this.defaultData(),
    fileName: false,
    fileError: false,
    showAdvancedOptions: false,
    title: false,
    selectedAnlagen: [],
    selectedSpieler: [],
    selectedBahnen: [],
    selectedStatistic: false,
    diagrams: [],
    preview: false,
    colors: this.playerColors(this.defaultData()),
    showEditor: false
  };
  state = {...this.initialState};


  render() {
    return (
      <div className="App">
        <Sidebar
          loadFile={this.loadFile}
          data={this.state.data}
          colors={this.state.colors}
          fileName={this.state.fileName}
          fileError={this.state.fileError}
          showAdvancedOptions={this.state.showAdvancedOptions}
          setShowAdvancedOptions={this.setShowAdvancedOptions}
          title={this.state.title}
          handleTitleChange={this.handleTitleChange}
          selectedAnlagen={this.state.selectedAnlagen}
          handleAnlagenChange={this.handleAnlagenSelectChange}
          selectedSpieler={this.state.selectedSpieler}
          handleSpielerChange={this.handleSpielerSelectChange}
          selectedBahnen={this.state.selectedBahnen}
          handleBahnenChange={this.handleBahnenSelectChange}
          selectedStatistic={this.state.selectedStatistic}
          handleStatisticChange={this.handleStatisticChange}
          addDiagram={this.addDiagram}
          doPrint={this.doPrint}
        />
        <div id="pdf-container">
          {this.state.data.showEditor && (<Editor data={this.state.data} updateJSON={this.updateJSON}/>)}
          <PDF diagrams={this.state.diagrams} selectedStatistic={this.state.selectedStatistic} preview={this.state.preview}/>
        </div>
      </div>
    );
  }

  defaultData() {
      var data = [{"anlage": "Freibad Wetzlar","datum": "2018-02-27","spieler" : "Karl Maier","bahnen": [1,1,2, 2,2,4, 2,2,2, 2,3,3, 3,3,1, 3,3,3]},{"anlage": "SG Arheilgen Miniaturgolf","datum": "2017-09-25","spieler" : "Johanna Jung","bahnen": [1,2,1, 1,1,1, 1,2,1, 1,1,1, 2,1,2, 1,5,2]}, { "anlage": "SG Arheilgen Miniaturgolf", "datum": "2017-04-23", "spieler" : "Johanna Jung", "bahnen": [2,2,1, 1,2,1, 1,1,1, 2,1,1, 2,2,1, 1,2,1] }, { "anlage": "SG Arheilgen Miniaturgolf", "datum": "2017-09-25", "spieler" : "Johanna Jung", "bahnen": [1,2,2, 1,1,1, 1,1,1, 1,1,1, 1,2,2, 1,1,2] }, { "anlage": "SG Arheilgen Miniaturgolf", "datum": "2017-02-01", "spieler" : "Johanna Jung", "bahnen": [1,2,2, 1,1,1, 1,1,1, 1,2,1, 1,1,1, 1,1,2] }, { "anlage": "SG Arheilgen Miniaturgolf", "datum": "2017-09-25", "spieler" : "Selina Krauss", "bahnen": [1,3,2, 1,1,1, 1,1,1, 1,1,1, 1,1,1, 1,1,1] }, { "anlage": "SG Arheilgen Miniaturgolf", "datum": "2017-09-25", "spieler" : "Selina Krauss", "bahnen": [3,2,2, 1,5,2, 1,1,1, 1,1,1, 1,1,1, 1,1,1] }, { "anlage": "SG Arheilgen Miniaturgolf", "datum": "2017-09-25", "spieler" : "Marcel Staudt", "bahnen": [1,3,2, 1,1,1, 1,1,1, 1,2,1, 1,2,2, 2,5,1] }, { "anlage": "SG Arheilgen Miniaturgolf", "datum": "2017-09-25", "spieler" : "Marcel Staudt", "bahnen": [2,2,2, 2,1,2, 1,4,1, 1,2,1, 2,1,1, 1,1,1] }];

      return data;
  }

  playerColors(data) {
    //Get all Player
    var playerColors = {};
    data.forEach(spiel => {
      if(!playerColors.hasOwnProperty(spiel.spieler)){
        playerColors[spiel.spieler] = null;
      }
    });
    //Generate a distinct color for every Player
    var palette = distinctColors({count: Object.keys(playerColors).length});
    //Add a color to every Player
    var i = 0;
    for (var player in playerColors) {
      playerColors[player] = palette[i];
      i++;
    };
    return playerColors;
  }

  updateJSON = json => {
    this.setState=({data: json});
  }

  addDiagram = value => {
    if(!this.state.selectedStatistic){
      console.log("no diagram selected")
      return
    }
    let newDiagram = this.state.selectedStatistic.value();
    let newDiagrams = this.state.diagrams;
    newDiagrams.push(newDiagram)
    this.setState({...this.initialState, diagrams:newDiagrams})
  }

  updatePreview = value => {
    let preview = this.state.selectedStatistic.value()
    this.setState({preview: preview})
  }

  setShowAdvancedOptions = value =>{
    this.setState({showAdvancedOptions: !this.state.showAdvancedOptions})
  }

  handleTitleChange = event => {
      this.setState({title: event.target.value}, ()=>{
        this.updatePreview()
      })
  }

  handleAnlagenSelectChange = value => {
    let newval = value;
    if(this.state.selectedStatistic && !(this.state.selectedStatistic.anlagen === 'MULTI')){
      newval = []
      newval.push(value)
    }
    this.setState({ selectedAnlagen: newval}, ()=>{
      this.updatePreview()
    });
  };

  handleSpielerSelectChange = value => {
    let newval = value;
    if(this.state.selectedStatistic && !(this.state.selectedStatistic.spieler === 'MULTI')){
      newval = []
      newval.push(value)
    }
    this.setState({ selectedSpieler: newval}, ()=>{
      this.updatePreview()
    });
  };

  handleBahnenSelectChange = value => {
    let newval = value;
    if(this.state.selectedStatistic && !(this.state.selectedStatistic.bahnen === 'MULTI')){
      newval = []
      newval.push(value)
    }
    this.setState({ selectedBahnen: newval}, ()=>{
      this.updatePreview()
    });
  };

  handleStatisticChange = value => {
    let preview = false
    if(value) preview = value.value()
    this.setState({ selectedStatistic: value, preview: preview });
  }

  loadFile = files => {
    this.setState({...this.initialState, diagrams: []})
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
            title: false,
            selectedAnlagen: [],
            selectedSpieler: [],
            selectedBahnen: [],
            colors: this.playerColors(data) });
        } catch (err) {
          this.setState({...this.initialState, fileError: 'error parsing the json! (check https://jsonlint.com/)'});
        }
      };
      reader.readAsText(file);
    } else {
      this.setState({...this.initialState, fileError: 'the file APIs are not fully supported in this browser!'});
    }
  };

  doPrint = value => {
    this.setState({selectedStatistic: false},()=>{
      setTimeout(()=>{window.print()},500)
    })
  }
}

export default App;
