import React from 'react';
import Select from "react-select";
import Chart from 'chart.js';

class Statistics extends React.Component {

    constructor(props) {
        super(props);

        console.log("Constructor", this.props.data);

        this.spielerScores = this.spielerScores.bind(this);

        this.line = this.line.bind(this);
        this.bar = this.bar.bind(this);
        this.horizontalBar = this.horizontalBar.bind(this);
        this.groupedBar = this.groupedBar.bind(this);
        this.radar = this.radar.bind(this);
        this.pie = this.pie.bind(this);
        this.doughnut = this.doughnut.bind(this);
        this.polar = this.polar.bind(this);
        this.bubble = this.bubble.bind(this);
        this.scatter = this.scatter.bind(this);
        this.area = this.area.bind(this);
        this.mixed = this.mixed.bind(this);

        this.state = {
            statistics: [
                {label: "Ergebnisse", value: this.spielerScores},
                {label: "line", value: this.line},
                {label: "bar", value: this.bar},
                {label: "horizontalBar", value: this.horizontalBar},
                {label: "groupedBar", value: this.groupedBar},
                {label: "radar", value: this.radar},
                {label: "pie", value: this.pie},
                {label: "doughnut", value: this.doughnut},
                {label: "polar", value: this.polar},
                {label: "bubble", value: this.bubble},
                {label: "scatter", value: this.scatter},
                {label: "area", value: this.area},
                {label: "mixed", value: this.mixed},
            ]
        };
    }

    onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
    }

    spielerScores() {

        console.log(this.props);
        
        var datasets = [];
        
        var anlagen = Array.from(this.props.selectedAnlagen, x => x.value);
        
        

        

        var spieler = Array.from(this.props.selectedSpieler, x => {
            if(anlagen.indexOf(x.value)){
                return null;
            }
            return x.value;
        });
        if(spieler.length === 0){
            spieler = Array.from(this.props.data, x => x.spieler).filter(this.onlyUnique);
        }
        
        var bahnen = Array.from(this.props.selectedBahnen, x => x.value);

        var data = {
            type: 'bar',
            data: {
                labels: spieler,
                datasets: [{
                    label: "Spielerergebnisse",
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'World population per region (in millions)'
                }
            }
        };

        this.setChart('spielerErgebnis', data);
    }

    line() {
        var data = {
            type: 'line',
            data: {
                labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
                datasets: [{
                        data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
                        label: "Africa",
                        borderColor: "#3e95cd",
                        fill: false
                    }, {
                        data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
                        label: "Asia",
                        borderColor: "#8e5ea2",
                        fill: false
                    }, {
                        data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
                        label: "Europe",
                        borderColor: "#3cba9f",
                        fill: false
                    }, {
                        data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
                        label: "Latin America",
                        borderColor: "#e8c3b9",
                        fill: false
                    }, {
                        data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
                        label: "North America",
                        borderColor: "#c45850",
                        fill: false
                    }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'World population per region (in millions)'
                }
            }
        };
        this.setChart("line", data);
    }

    bar() {
        var data = {
            type: 'bar',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                }
            }
        };
        this.setChart("bar", data);
    }

    horizontalBar() {
        var data = {
            type: 'horizontalBar',
            data: {
                labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
                datasets: [
                    {
                        label: "Population (millions)",
                        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                        data: [2478, 5267, 734, 784, 433]
                    }
                ]
            },
            options: {
                legend: {display: false},
                title: {
                    display: true,
                    text: 'Predicted world population (millions) in 2050'
                }
            }
        };
        this.setChart('horizontalBar', data);
    }

    groupedBar() {
        var data = {
            type: 'bar',
            data: {
                labels: ["1900", "1950", "1999", "2050"],
                datasets: [
                    {
                        label: "Africa",
                        backgroundColor: "#3e95cd",
                        data: [133, 221, 783, 2478]
                    }, {
                        label: "Europe",
                        backgroundColor: "#8e5ea2",
                        data: [408, 547, 675, 734]
                    }
                ]
            },
            options: {
                legend: {display: false},
                title: {
                    display: true,
                    text: 'Population growth (millions)'
                }
            }
        };
        this.setChart('groupedBar', data);
    }

    radar() {
        var data = {
            type: 'radar',
            data: {
                labels: ['Running', 'Swimming', 'Eating', 'Cycling'],
                datasets: [{
                        label: "1950",
                        fill: true,
                        backgroundColor: "rgba(179,181,198,0.2)",
                        borderColor: "rgba(179,181,198,1)",
                        pointBorderColor: "#fff",
                        pointBackgroundColor: "rgba(179,181,198,1)",
                        data: [8.77, 55.61, 21.69, 6.62, 6.82]
                    }, {
                        label: "2050",
                        fill: true,
                        backgroundColor: "rgba(255,99,132,0.2)",
                        borderColor: "rgba(255,99,132,1)",
                        pointBorderColor: "#fff",
                        pointBackgroundColor: "rgba(255,99,132,1)",
                        pointBorderColor: "#fff",
                        data: [25.48, 54.16, 7.61, 8.06, 4.45]
                    }]
            }

        };
        this.setChart("radar", data);
    }

    pie() {
        var data = {
            type: 'pie',
            data: {
                labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
                datasets: [{
                        label: "Population (millions)",
                        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                        data: [2478, 5267, 734, 784, 433]
                    }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Predicted world population (millions) in 2050'
                }
            }
        };
        this.setChart("pie", data);
    }

    doughnut() {
        var data = {
            type: 'doughnut',
            data: {
                labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
                datasets: [{
                        label: "Population (millions)",
                        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                        data: [2478, 5267, 734, 784, 433]
                    }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Predicted world population (millions) in 2050'
                }
            }
        };
        this.setChart("doughnut", data);
    }

    polar() {
        var data = {
            type: 'bar',
            data: {
                labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
                datasets: [
                    {
                        label: "Population (millions)",
                        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                        data: [2478, 5267, 734, 784, 433]
                    }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'Predicted world population (millions) in 2050'
                }
            }
        };
        this.setChart("polar", data);
    }

    bubble() {
        var data = {
            type: 'bubble',
            data: {
                labels: "Africa",
                datasets: [
                    {
                        label: ["China"],
                        backgroundColor: "rgba(255,221,50,0.2)",
                        borderColor: "rgba(255,221,50,1)",
                        data: [{
                                x: 21269017,
                                y: 5.245,
                                r: 15
                            }]
                    }, {
                        label: ["Denmark"],
                        backgroundColor: "rgba(60,186,159,0.2)",
                        borderColor: "rgba(60,186,159,1)",
                        data: [{
                                x: 258702,
                                y: 7.526,
                                r: 10
                            }]
                    }, {
                        label: ["Germany"],
                        backgroundColor: "rgba(0,0,0,0.2)",
                        borderColor: "#000",
                        data: [{
                                x: 3979083,
                                y: 6.994,
                                r: 15
                            }]
                    }, {
                        label: ["Japan"],
                        backgroundColor: "rgba(193,46,12,0.2)",
                        borderColor: "rgba(193,46,12,1)",
                        data: [{
                                x: 4931877,
                                y: 5.921,
                                r: 15
                            }]
                    }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'Predicted world population (millions) in 2050'
                }, scales: {
                    yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "Happiness"
                            }
                        }],
                    xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "GDP (PPP)"
                            }
                        }]
                }
            }
        };
        this.setChart("bubble", data);
    }

    scatter() {
        var data = {
            type: 'bar',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                        labels: ['Running', 'Swimming', 'Eating', 'Cycling'],
                        datasets: [{
                                data: [20, 10, 4, 2]
                            }]
                    }]
            },
            options: {
                scales: {
                    yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                }
            }
        };
        this.setChart("scatter", data);
    }

    area() {
        var data = {
            type: 'bar',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                        labels: ['Running', 'Swimming', 'Eating', 'Cycling'],
                        datasets: [{
                                data: [20, 10, 4, 2]
                            }]
                    }]
            },
            options: {
                scales: {
                    yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                }
            }
        };
        this.setChart("area", data);
    }

    mixed() {
        var data = {
            type: 'bar',
            data: {
                labels: ["1900", "1950", "1999", "2050"],
                datasets: [{
                        label: "Europe",
                        type: "line",
                        borderColor: "#8e5ea2",
                        data: [408, 547, 675, 734],
                        fill: false
                    }, {
                        label: "Africa",
                        type: "line",
                        borderColor: "#3e95cd",
                        data: [133, 221, 783, 2478],
                        fill: false
                    }, {
                        label: "Europe",
                        type: "bar",
                        backgroundColor: "rgba(0,0,0,0.2)",
                        data: [408, 547, 675, 734],
                    }, {
                        label: "Africa",
                        type: "bar",
                        backgroundColor: "rgba(0,0,0,0.2)",
                        backgroundColorHover: "#3e95cd",
                        data: [133, 221, 783, 2478]
                    }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'Population growth (millions): Europe & Africa'
                },
                legend: {display: false}
            }
        };
        this.setChart("mixed", data);
    }

    setChart(ctx, data) {
        var canvas = document.getElementById(ctx);
        if (canvas === null) {
            canvas = document.createElement('canvas');
            canvas.setAttribute("id", ctx);
            document.getElementById("pdf").appendChild(canvas);
        }
        var ctx = canvas.getContext("2d");
        var myChart = new Chart(ctx, data);
    }

    render() {
        console.log("Re-Render --- State: ", this.props);

        var pdf = document.getElementById('pdf');
        if (pdf != null) {
            pdf.innerHTML = '';
        }

        this.props.selectedStatistics.forEach(statistic => {
            statistic.value();
        });

        return (
                <div id="StatisticsList">
                    <p>Statistiken</p>
                    <Select 
                        name="statistics-select" 
                        options={this.state.statistics} 
                        multi={true} 
                        closeOnSelect={false} 
                        value={this.props.selectedStatistics} 
                        onChange={this.props.handleStatisticsChange}
                        />
                
                </div>


                );

        /*<div id="pdf">
         <button onClick={this.line}>Line</button>
         <canvas id="line"></canvas>
         
         <button onClick={this.bar}>Bar</button>
         <canvas id="bar"></canvas>
         
         <button onClick={this.radar}>Radar</button>
         <canvas id="radar"></canvas>
         
         <button onClick={this.pie}>Pie</button>
         <canvas id="pie"></canvas>
         
         <button onClick={this.pie}>Doughnut</button>
         <canvas id="doughnut"></canvas>
         
         <button onClick={this.polar}>Polar Area</button>
         <canvas id="polar"></canvas>
         
         <button onClick={this.bubble}>Bubble Chart</button>
         <canvas id="bubble"></canvas>
         
         <button onClick={this.scatter}>Scatter Chart</button>
         <canvas id="scatter"></canvas>
         
         <button onClick={this.area}>Area</button>
         <canvas id="area"></canvas>
         
         <button onClick={this.mixed}>Mixed</button>
         <canvas id="mixed"></canvas>
         
         </div>*/

    }
}

export default Statistics;