import React from "react";
import Diagram from './Diagram'



const PDF = props => {

  return (
    <div id="pdf">
      {(props.selectedStatistic && props.preview)? (
        <div id="live-preview">
          <p>live-Vorschau:</p>
          <Diagram type={props.preview.type} desc={props.preview.desc} options={props.preview.options}/>
        </div>
      ) : (
        props.diagrams.map(d=><Diagram type={d.type} desc={d.desc} options={d.options}/>)
      )}

    </div>
  );
};


export default PDF;
