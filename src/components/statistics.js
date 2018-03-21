import React from 'react';
import Select from "react-select";

class Statistics extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            statistics: [
                {label: "Schläge pro Bahn", value: this.schlaegeProBahn.bind(this), spieler: 'SINGLE'},
            ]
        };
    }

    onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    schlaegeProBahn() {
      let scores = [];
      let count = [];
      let labels = [];
      let avg = [];

      //TODO: weitere Filter berücksichtigen
      this.props.data.forEach(data=>{
        //filter by player
        if(this.props.selectedSpieler[0] && data.spieler !== this.props.selectedSpieler[0].value) return
        data.bahnen.forEach((score, index)=>{
          if(scores[index] !== undefined){
            scores[index] += score
            count[index] += 1
          }else{
            scores[index] = score
            count[index] = 1
            labels.push(index+1)
          }
        })
      })

      scores.forEach((score, index)=>{
        avg[index] = score / count[index]
      })

      let labelExt = ' (alle Spieler)'
      if(this.props.selectedSpieler[0]) labelExt = ' ('+this.props.selectedSpieler[0].value+')'

        var data = {
          labels: labels,
          datasets: [{
              label: '⌀ Anzahl der Schläge'+labelExt,
              data: avg,
              borderWidth: 1
          }]
        }
        let options = {
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
          }
        }
        return {
          type: 'bar',
          desc: data,
          options: options,
        }
    }

    render() {
      return (
              <div id="StatisticsList">
                  <p>Statistiken</p>
                  <Select
                      name="statistics-select"
                      options={this.state.statistics}
                      closeOnSelect={true}
                      value={this.props.selectedStatistic}
                      onChange={this.props.handleStatisticChange}
                      />
              </div>
            );
    }
}

export default Statistics;
