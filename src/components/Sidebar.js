import React from "react";
import Dropzone from "react-dropzone";
import OptionList from "./OptionList";

const Sidebar = props => {
  return (
    <div id="Sidebar">
      <h1>Minigolf PDF</h1>
      <p>Drag your JSON file here.</p>
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
