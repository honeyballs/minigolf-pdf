import React from 'react';
import Select from "react-select";

class Statistics extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            statistics: [
                {label: "Schläge pro Bahn", value: this.schlaegeProBahn.bind(this), spieler: 'SINGLE'},
                {label: "Spieler pro Bahn", value: this.spielerProBahn.bind(this), spieler: 'MULTI'},
            ]
        };
    }

    onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    //TODO: generate colors for diagrams

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

    spielerProBahn() {
      let players = {}
      let labels = []

      //TODO: weitere Filter berücksichtigen
      this.props.data.filter(d=>{
        if(this.props.selectedSpieler.length){
          let match = this.props.selectedSpieler.filter(s=>s.value === d.spieler)
          if(!match || !match.length) return false
        }
        return d
      }).forEach(data=>{
        if(!players[data.spieler]) players[data.spieler] = {scores:[], count:[], avg:[]}
        let player = players[data.spieler]
        data.bahnen.forEach((score, index)=>{
          if(player.scores[index] !== undefined){
            player.scores[index] += score
            player.count[index] += 1
          }else{
            player.scores[index] = score
            player.count[index] = 1
          }
          if(labels[index+1] === undefined) labels.push(index+1)
        })
        player.scores.forEach((score, index)=>{
          player.avg[index] = score / player.count[index]
        })
      })

      let datasets = []
      Object.keys(players).forEach(key=>{
        datasets.push({
          label: key,
          data: players[key].avg
        })
      })

      var data = {
        labels: labels,
        datasets: datasets
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
        type: 'line',
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
