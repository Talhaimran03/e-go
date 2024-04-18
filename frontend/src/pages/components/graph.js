import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default class Grafico extends React.Component {
  render() {
    const { CO2Savings } = this.props; // Ottenere il prop CO2Savings

    // Estrai le etichette (mesi) e i risparmi di CO2 dal prop
    let labels = Object.keys(CO2Savings);
    let data = Object.values(CO2Savings);

    // Ordina le etichette e i dati in base al mese
    labels = labels.sort((a, b) => new Date(a + '-01') - new Date(b + '-01'));
    data = data.sort((a, b) => new Date(labels[data.indexOf(a)] + '-01') - new Date(labels[data.indexOf(b)] + '-01'));

    const state = {
      labels: labels,
      datasets: [
        {
          label: 'CO2 RISPARMIATA (in kg)',
          backgroundColor: '#4AA18B',
          borderColor: '#F5F5F5',
          borderWidth: 1,
          data: data, // Utilizza i risparmi di CO2 qui
        },
      ],
    };
    
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