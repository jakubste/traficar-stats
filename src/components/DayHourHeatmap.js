import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import addHeatmapModule from 'highcharts/modules/heatmap'
import Typography from '@material-ui/core/Typography'


window['Highcharts'] = Highcharts;

const styles = {}

class DayHourHeatmap extends Component {


  render() {

    const dates = this.props.dates

    console.log(dates)

    const data = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ]

    dates.forEach(dateString => {
      const date = new Date(dateString)
      const day = (date.getDay() + 6) % 7  // 0 is Sunday
      const timeOfDay = Math.floor(date.getHours() / 6)
      data[timeOfDay][day] += 1
    })

    const chartData = []
    for (let t = 0; t < 4; t++) {
      for (let d = 0; d < 7; d++) {
         chartData.push([d, t, data[t][d]])
      }
    }

    const options = {
      chart: {
        type: 'heatmap',
        marginTop: 40,
        marginBottom: 80,
        plotBorderWidth: 1
      },

      title: {
        text: 'Użycie w tygodniu'
      },

      xAxis: {
        categories: ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela',]
      },

      yAxis: {
        categories: ['Rano (0-6)', 'Przedpołudnie (6-12)', 'Popołudnie (12-18)', 'Wieczór (18-24)'],
        reversed: true,
        title: false
      },

      colorAxis: {
        min: 0,
        minColor: '#FFFFFF',
        maxColor: "#941f91",
        reversed: false,
      },

      legend: {
        align: 'right',
        layout: 'vertical',
        margin: 0,
        verticalAlign: 'top',
        y: 25,
        symbolHeight: 280
      },

      tooltip: {
        formatter: function () {
          return '<b>' + this.series.xAxis.categories[this.point.x] + '</b><br><b>' +
            this.series.yAxis.categories[this.point.y] + '</b> <br><b>' + this.point.value + '</b> przejazdów';
        }
      },

      series: [{
        name: 'Reservations per time of day',
        borderWidth: 1,
        data: chartData,
        dataLabels: {
          enabled: true,
          color: '#000000'
        }
      }]

    }

    return (
      <>
        <Typography variant="h6">Kiedy jeździłeś?</Typography>

        <HighchartsReact
          highcharts={addHeatmapModule(Highcharts)}
          options={options}
        />
      </>
    )

  }
}

export default withStyles(styles)(DayHourHeatmap)