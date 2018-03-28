import React from "react";
import Dropzone from "react-dropzone";
import OptionList from "./OptionList";
import Statistics from "./statistics";

const Sidebar = props => {
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
        <div id="stats-area">
          <Statistics
            data={props.data}
            title={props.title}
            selectedStatistic={props.selectedStatistic}
            handleStatisticChange={props.handleStatisticChange}
            selectedSpieler={props.selectedSpieler}
            selectedAnlagen={props.selectedAnlagen}
            selectedBahnen={props.selectedBahnen}
          />
          {props.selectedStatistic && (
            <OptionList
              data={props.data}
              title={props.title}
              handleTitleChange={props.handleTitleChange}
              selectedAnlagen={props.selectedAnlagen}
              handleAnlagenChange={props.handleAnlagenChange}
              selectedSpieler={props.selectedSpieler}
              handleSpielerChange={props.handleSpielerChange}
              selectedBahnen={props.selectedBahnen}
              handleBahnenChange={props.handleBahnenChange}
              selectedStatistic={props.selectedStatistic}
            />
          )}
        </div>
      )}
      {props.selectedStatistic && (
      <div id="sidebar-buttons">
        <button onClick={props.addDiagram}>Hinzufügen</button>
        <button onClick={evt => props.doPrint()} style={btnPrintStyle}>Drucken</button>
      </div>)}
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
