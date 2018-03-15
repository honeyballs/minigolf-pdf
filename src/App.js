import React, { Component } from 'react';
import Sidebar from "./components/Sidebar";
import './App.css';

class App extends Component {

  state = {
    data: []
  }

  render() {
    return (
      <div className="App">
        <Sidebar files={this.state.files} loadFile={this.loadFile}/>
        <div id="pdf"></div>
      </div>
    );
  }

  loadFile = (files)=>{
    if(!files.length){
      console.log("no file uploaded")
      return
    }
    let file = files[0]
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      //TODO: check file type for json, oder dropzone so einstellen das es nur json akzepziert
      let reader = new FileReader()
      reader.onload = ()=>{
        //TODO: try catch for valid json
        let data = JSON.parse(reader.result)
        this.setState({data:data})
      }
      reader.readAsText(file)

    } else {
      console.log('The File APIs are not fully supported in this browser.')
    }
  }
}

export default App;
