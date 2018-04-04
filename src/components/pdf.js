import React from "react";
import Diagram from './Diagram'



const PDF = props => {

  //TODO: CSS add dinA4 hint

  return (
    <div id="pdf">
      {(props.selectedStatistic && props.preview)? (
        <div id="live-preview">
          <h2>Vorschau:</h2>
          <p>Bitte klicken Sie "Hinzufügen", um das Diagramm in das PDF einzufügen.</p>
          <div className="diagram-item">
            <h3>{props.preview.title}</h3>
            <Diagram type={props.preview.type} desc={props.preview.desc} options={props.preview.options}/>
          </div>
        </div>
      ) : <div id="pdf-content">{props.diagrams.map((d, index) =>
        <div className="diagram-item" style={ {marginBottom: (d.bottomSpace? d.bottomSpace+'px' : false)} }>
          <h3>{d.title}</h3>
          <Diagram key={index} type={d.type} desc={d.desc} options={d.options}/>
        </div>
      )}</div>}

    </div>
  );
};


export default PDF;
