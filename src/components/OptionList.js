import React from "react";
import Select from "react-select";
import "react-select/dist/react-select.css";

const OptionList = props => {
  //initialize select options
  var anlageObjects = [];
  var spielerObjects = [];
  var bahnObjects = [];
  props.data.forEach(object => {
    const anlageObject = { value: object.anlage, label: object.anlage };
    const spielerObject = { value: object.spieler, label: object.spieler };
    //only add the new object if it doesn't exist
    if (
      anlageObjects.filter(object => object.value === anlageObject.value)
        .length <= 0
    ) {
      anlageObjects = [...anlageObjects, anlageObject];
    }
    if (
      spielerObjects.filter(object => object.value === spielerObject.value)
        .length <= 0
    ) {
      spielerObjects = [...spielerObjects, spielerObject];
    }
  });
  for (var i = 1; i < 19; i++) {
    bahnObjects = [...bahnObjects, {value: i, label: `Bahn ${i}`}];
  }
  return (
    <div id="OptionList">
      <Select name="anlage-select" options={anlageObjects} multi={true} closeOnSelect={false} value={props.selectedAnlagen} onChange={props.handleAnlagenChange}/>
      <Select name="spieler-select" options={spielerObjects} multi={true} closeOnSelect={false} value={props.selectedSpieler} onChange={props.handleSpielerChange}/>
      <Select name="bahn-select" options={bahnObjects} multi={true} closeOnSelect={false} value={props.selectedBahnen} onChange={props.handleBahnenChange}/>
    </div>
  );
};

export default OptionList;
