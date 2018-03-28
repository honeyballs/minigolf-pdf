import React from "react";
import Diagram from './Diagram'



const PDF = props => {

  return (
    <div id="pdf">
      {(props.selectedStatistic && props.preview)? (
        <div id="live-preview">
          <h2>Vorschau:</h2>
          <p>Bitte klicken Sie "Hinzufügen", um das Diagramm in das PDF einzufügen.</p>
          <Diagram type={props.preview.type} desc={props.preview.desc} options={props.preview.options}/>
        </div>
      ) : <div id="pdf-content">{props.diagrams.map((d, index) =><Diagram key={index} type={d.type} desc={d.desc} options={d.options}/>)}</div>}

    </div>
  );
};


export default PDF;
