import React from "react";
import Dropzone from "react-dropzone";
import OptionList from "./OptionList";

const Sidebar = props => {
  return (
    <div id="Sidebar">
      <section>
        <div className="dropzone" accept=".json">
          <Dropzone onDrop={props.loadFile}>
            <p>
              Try dropping some files here, or click to select files to upload.
            </p>
          </Dropzone>
        </div>
      </section>
      <OptionList
        data={props.data}
        selectedAnlagen={props.selectedAnlagen}
        handleAnlagenChange={props.handleAnlagenChange}
        selectedSpieler={props.selectedSpieler}
        handleSpielerChange={props.handleSpielerChange}
        selectedBahnen={props.selectedBahnen}
        handleBahnenChange={props.handleBahnenChange}
      />
    </div>
  );
};

export default Sidebar;
