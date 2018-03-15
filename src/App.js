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
        <Sidebar loadFile={this.loadFile}/>
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
    if(!file.name.endsWith(".json")){
      console.log("uploaded file is not a .json file")
      return
    }
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      let reader = new FileReader()
      reader.onload = ()=>{
        try {
          let data = JSON.parse(reader.result)
          this.setState({data:data})
        }catch(err){
            console.log("error parsing the json")
        }
      }
      reader.readAsText(file)

    } else {
      console.log('The File APIs are not fully supported in this browser.')
    }
  }
}

export default App;
