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
      <div className="select-wrap">
        <p>Titel</p>
        <input id="title-input" type="text" value={props.title?props.title:''} onChange={props.handleTitleChange} />
      </div>
      {props.selectedStatistic.anlagen && (
      <div className="select-wrap">
        <p>Anlagen</p>
        <Select name="anlage-select" options={anlageObjects}
          multi={(props.selectedStatistic.anlagen === 'MULTI')}
          closeOnSelect={!(props.selectedStatistic.anlagen === 'MULTI')}
          value={(props.selectedStatistic.anlagen==='MULTI')?props.selectedAnlagen:props.selectedAnlagen[0]} onChange={props.handleAnlagenChange}/>
      </div>
      )}
      {props.selectedStatistic.spieler && (
      <div className="select-wrap">
        <p>Spieler</p>
        <Select name="spieler-select" options={spielerObjects}
          multi={(props.selectedStatistic.spieler === 'MULTI')}
          closeOnSelect={!(props.selectedStatistic.spieler === 'MULTI')}
          value={(props.selectedStatistic.spieler==='MULTI')?props.selectedSpieler:props.selectedSpieler[0]} onChange={props.handleSpielerChange}/>
      </div>
      )}
      {props.selectedStatistic.bahnen && (
      <div className="select-wrap">
        <p>Bahnen</p>
        <Select name="bahn-select" options={bahnObjects}
          multi={(props.selectedStatistic.bahnen === 'MULTI')}
          closeOnSelect={!(props.selectedStatistic.bahnen === 'MULTI')}
          value={(props.selectedStatistic.bahnen==='MULTI')?props.selectedBahnen:props.selectedBahnen[0]} onChange={props.handleBahnenChange}/>
      </div>
      )}
    </div>
  );
};

export default OptionList;
