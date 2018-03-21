import React from "react";
import Diagram from './Diagram'



const PDF = props => {

  return (
    <div id="pdf">
      {props.diagrams.map(d=><Diagram type={d.type} desc={d.desc} options={d.options}/>)}
    </div>
  );
};


export default PDF;
