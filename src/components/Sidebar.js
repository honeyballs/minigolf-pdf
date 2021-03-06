import React from "react";
import Dropzone from "react-dropzone";
import OptionList from "./OptionList";
import Statistics from "./statistics";

const Sidebar = props => {
  return (
    <div id="Sidebar">
      <div className="sidebar-headline">
        <h1>Minigolf PDF</h1>
        <button onClick={ evt => props.toggleTutorial()}>?</button>
      </div>
      <p className="dropzone-headline">{props.fileName?<span><b>{props.fileName}</b> geladen</span>: 'Legen Sie ihre JSON Datei hier ab:'}</p>
      {props.fileError && <p className="dropzone-error">{props.fileError}</p>}
      <div className="dropzone" accept=".json">
        <Dropzone onDrop={props.loadFile} style={dropStyle}>
          <p>
            Legen Sie eine Datei ab, oder klicken Sie zum Hochladen.
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
            colors={props.colors}
          />
          {props.selectedStatistic && (
            <OptionList
              data={props.data}
              showAdvancedOptions={props.showAdvancedOptions}
              setShowAdvancedOptions={props.setShowAdvancedOptions}
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
      {(props.data.length != 0) && (
      <div id="sidebar-buttons">
        {props.selectedStatistic && (<button onClick={props.addDiagram}>Hinzufügen</button>)}
        <button onClick={evt => props.doPrint()} style={btnPrintStyle}>PDF Generieren</button>
      </div>
      )}
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
