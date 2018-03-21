import React from "react";
import {Bar} from 'react-chartjs-2'

const diagrams = {
  bar: Bar
}

const Diagram = props => {

  const SpecificDiagram = diagrams[props.type]


  return <SpecificDiagram data={props.desc} options={props.options}/>
};


export default Diagram;
