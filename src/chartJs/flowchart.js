import React from "react";

import {
  withStyles
} from "@material-ui/core/styles";
// import myIcon from '@/assets/my-icon.svg'

const styles = theme => ({
  "chart-container": {
    width: 960,
    height: 400
  }
});


var Chart = require("chart.js");
Chart.defaults.global.defaultFontFamily = "Roboto, sans-serif";

var zero = 7;

// LineChart
class FlowChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidUpdate() {
    var value = Math.floor((Math.random() * 100) + 1);;
    this.myChart.data.labels.push(zero);
    this.myChart.data.labels.splice(0, 1);
    this.myChart.data.datasets[0].data.splice(0, 1);
    //console.log(this.myChart.data.datasets[0].data);
    this.myChart.data.datasets[0].data.push(value);


    this.myChart.update();
    zero++;
  }

  componentDidMount() {

    var imageData = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [{
        label: "My First dataset",
        fill: false,
        lineTension: 0.0,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 10,
        data: [65, 59, 80, 0, 56, 55, 40],
      }]
    }
    var option = {
      showLines: true,
      scales: {
        yAxes: [{
          display: true,
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 100
          }
        }],
      }
    };

    this.myChart = new Chart(this.canvasRef.current, {
      type: 'line',
      data: imageData,
      options: option,
      plugins: {
        zoom: {
          // Container for pan options
          pan: {
            // Boolean to enable panning
            enabled: true,
      
            // Panning directions. Remove the appropriate direction to disable
            // Eg. 'y' would only allow panning in the y direction
            // A function that is called as the user is panning and returns the
            // available directions can also be used:
            //   mode: function({ chart }) {
            //     return 'xy';
            //   },
            mode: 'xy',
      
            rangeMin: {
              // Format of min pan range depends on scale type
              x: null,
              y: null
            },
            rangeMax: {
              // Format of max pan range depends on scale type
              x: null,
              y: null
            },
      
            // On category scale, factor of pan velocity
            speed: 20,
      
            // Minimal pan distance required before actually applying pan
            threshold: 10,
      
            // Function called while the user is panning
            onPan: function({chart}) { console.log(`I'm panning!!!`); },
            // Function called once panning is completed
            onPanComplete: function({chart}) { console.log(`I was panned!!!`); }
          },
      
          // Container for zoom options
          zoom: {
            // Boolean to enable zooming
            enabled: true,
      
            // Enable drag-to-zoom behavior
            drag: true,
      
            // Drag-to-zoom effect can be customized
            // drag: {
            // 	 borderColor: 'rgba(225,225,225,0.3)'
            // 	 borderWidth: 5,
            // 	 backgroundColor: 'rgb(225,225,225)',
            // 	 animationDuration: 0
            // },
      
            // Zooming directions. Remove the appropriate direction to disable
            // Eg. 'y' would only allow zooming in the y direction
            // A function that is called as the user is zooming and returns the
            // available directions can also be used:
            //   mode: function({ chart }) {
            //     return 'xy';
            //   },
            mode: 'xy',
      
            rangeMin: {
              // Format of min zoom range depends on scale type
              x: null,
              y: null
            },
            rangeMax: {
              // Format of max zoom range depends on scale type
              x: null,
              y: null
            },
      
            // Speed of zoom via mouse wheel
            // (percentage of zoom on a wheel event)
            speed: 0.1,
      
            // Minimal zoom distance required before actually applying zoom
            threshold: 2,
      
            // On category scale, minimal zoom level before actually applying zoom
            sensitivity: 3,
      
            // Function called while the user is zooming
            onZoom: function({chart}) { console.log(`I'm zooming!!!`); },
            // Function called once zooming is completed
            onZoomComplete: function({chart}) { console.log(`I was zoomed!!!`); }
          }
        }
      }
    });
  }

  render() {
    return <canvas ref = {
      this.canvasRef
    }
    height = "200" / > ;
  }
}

var updateInterval = 1000;

class MyChart extends React.Component {
  constructor() {
    super();

    this.state = {
      index: 0
    };
    this.updateChart = this.updateChart.bind(this);
  }

  componentDidMount() {
    setInterval(this.updateChart, updateInterval);
  }

  componentWillUnmount() {}

  updateChart() {
    this.setState({
      index: this.state.index + 1
    });
  }

  render() {
    const {
      classes
    } = this.props;

    return ( 
      <div className = {classes["chart-container"]} >
      <FlowChart color = "#3E517A" />
      </div>
    );
  }
}

export default withStyles(styles, {
  withTheme: true
})(MyChart);