import React from 'react';
import Select from "react-select";

class Statistics extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            statistics: [
                {label: "Schläge pro Bahn", value: this.schlaegeProBahn.bind(this), spieler: 'SINGLE', anlagen: 'MULTI'},
                {label: "Spieler pro Bahn", value: this.spielerProBahn.bind(this), spieler: 'MULTI'},
                {label: "Ergebnisse über Zeit", value: this.ergebnisseUeberZeit.bind(this), spieler: 'SINGLE'}
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
      this.props.data.filter(d=>{
        //filter by anlage
        if(this.props.selectedAnlagen.length){
          let match = this.props.selectedAnlagen.filter(a=>a.value === d.anlage)
          if(!match || !match.length) return false
        }
        return d
      }).forEach(data=>{
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
      if(this.props.selectedAnlagen.length){
        labelExt += ' auf'
        this.props.selectedAnlagen.forEach(anlage=>{
          labelExt += ' '+anlage.value
        })
      }
        var data = {
          labels: labels,
          datasets: [{
              label: '⌀ Anzahl der Schläge'+labelExt,
              data: avg,
              borderWidth: 1
          }]
        }

        if(this.props.selectedSpieler.length){
          if(this.props.selectedSpieler[0]){
            data.datasets[0].backgroundColor = this.props.colors[this.props.selectedSpieler[0].label];
          }
        }

        let options = {
          scales: {
            xAxes: [{
              stacked: true
          }],
            yAxes: [{
              stacked: true,
                ticks: {
                    beginAtZero: true
                }
            }]
          }
        }
        let title = 'Schläge pro Bahn'
        if(this.props.title && this.props.title.length) title = this.props.title
        return {
          title: title,
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
        //filter by player
        if(this.props.selectedSpieler.length && this.props.selectedSpieler[0]){
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
          data: players[key].avg,
          borderColor: this.props.colors[key],
          backgroundColor: this.props.colors[key],
          fill: false
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

      let title = 'Spieler pro Bahn'
      if(this.props.title && this.props.title.length) title = this.props.title
      return {
        title: title,
        type: 'line',
        desc: data,
        options: options,
      }
    }

    ergebnisseUeberZeit() {
      let spieler = this.props.selectedSpieler[0]
      if(!spieler){
        //TODO: default select first spieler and reassign
        return
      }

      let results = this.props.data.filter(d=>{
        return d.spieler == spieler.value
      })


      let months = {}

      results.sort((a,b)=>{
        let aD = new Date(a.datum)
        let bD = new Date(b.datum)
        return aD.getTime() > bD.getTime()
      })

      results.forEach(res=>{
        let total = 0
        res.bahnen.forEach(bahn=>{total+=bahn})
        let d = new Date(res.datum)
        //TODO: month add leading 0
        let str = (d.getMonth()+1)+'.'+d.getFullYear()
        if(months[str]){
          months[str].total += total
          months[str].count += 1
        }else{
          months[str] = {total: total, count: 1}
        }
      })


      let labels = []
      let datasets = []
      let spielerData = []
      Object.keys(months).forEach(key => {
        labels.push(key)
        spielerData.push(months[key].total/months[key].count)
      })

      datasets.push({
        label: spieler.value,
        data: spielerData,
        borderColor: this.props.colors[spieler.label],
        backgroundColor: this.props.colors[spieler.label],
        fill: false
      })

      //TODO: yAchse Puffer nach oben und unten. xAchse auch Puffern wenn möglich, sieht blod aus wenn nur 1 eintrag vorhanden
      var data = {
        labels: labels,
        datasets: datasets,

      }
      let options = {
        scales: {
          yAxes: [{

          }]
        }
      }

      let title = 'Ergebnisse über Zeit'
      if(this.props.title && this.props.title.length) title = this.props.title
      return {
        title: title,
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
