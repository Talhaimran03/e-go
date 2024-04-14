import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const state = {
  labels: [
    'Gennaio',
    'Febbraio',
    'Marzo',
    'Aprile',
    'Maggio',
    'Giugno',
    'Luglio',
  ],
  datasets: [
    {
      label: 'CO2 RISPARMIATA (in kg)',
      backgroundColor: '#4AA18B',
      borderColor: '#F5F5F5',
      borderWidth: 1,
      data: [8, 5, 7, 6, 9, 8, 8],
    },
  ],
}

export default class Grafico extends React.Component {
  render() {
    return (
      <div>
        <Bar
          data={state}
          options={{
            title: {
              display: true,
              text: 'Class strength',
              fontSize: 20,
            },
            legend: {
              display: true,
              position: 'right',
            },
          }}
        />
      </div>
    )
  }
}
