import React from "react";
import {Bar, Line} from 'react-chartjs-2'

const diagrams = {
  bar: Bar,
  line: Line,
}

const Diagram = props => {

  const SpecificDiagram = diagrams[props.type]


  return <SpecificDiagram data={props.desc} options={props.options}/>
};


export default Diagram;
