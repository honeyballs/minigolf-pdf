import React from "react";
import Dropzone from "react-dropzone";
import OptionList from "./OptionList";
import Statistics from "./statistics";

const Sidebar = props => {
    console.log(props);
  return (
    <div id="Sidebar">
      <h1>Minigolf PDF</h1>
      <p className="dropzone-headline">{props.fileName?<span><b>{props.fileName}</b> loaded</span>: 'Drag your JSON file here.'}</p>
      {props.fileError && <p className="dropzone-error">{props.fileError}</p>}
      <div className="dropzone" accept=".json">
        <Dropzone onDrop={props.loadFile} style={dropStyle}>
          <p>
            Try dropping some files here, or click to select files to upload.
          </p>
        </Dropzone>
      </div>
      {props.data.length > 0 && (
        <OptionList
          data={props.data}
          selectedAnlagen={props.selectedAnlagen}
          handleAnlagenChange={props.handleAnlagenChange}
          selectedSpieler={props.selectedSpieler}
          handleSpielerChange={props.handleSpielerChange}
          selectedBahnen={props.selectedBahnen}
          handleBahnenChange={props.handleBahnenChange}
        />
      )}
      <Statistics 
        data={props.data} 
        selectedStatistics={props.selectedStatistics} 
        handleStatisticsChange={props.handleStatisticsChange}
        selectedSpieler={props.selectedSpieler}
        selectedAnlagen={props.selectedAnlagen}
        selectedBahnen={props.selectedBahnen}
      />
      <button onClick={evt => window.print()} style={btnPrintStyle}>Drucken</button>
    </div>
  );
};

const dropStyle = {
  width: "100%",
  height: "200px",
  color: "#fff",
  border: "2px dotted #fff",
  borderRadius: "15px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center"
};

const btnPrintStyle = {
  margin: "1em"
}

export default Sidebar;
