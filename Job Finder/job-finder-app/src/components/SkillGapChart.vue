<script setup>
import { Radar } from 'vue-chartjs'
import {
  Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement, RadialLinearScale, Filler
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, PointElement, RadialLinearScale, LineElement, Filler)

const chartData = {
  labels: ['Demand', 'Skills', 'Domain', 'Capacity', 'Testing', 'Tech'],
  datasets: [{
    label: 'Required',
    backgroundColor: 'rgba(93, 173, 226, 0.05)',
    borderColor: 'rgba(93, 173, 226, 0.3)',
    borderWidth: 1.5,
    pointRadius: 0,
    data: [90, 70, 85, 60, 80, 75]
  }, {
    label: 'Profile',
    backgroundColor: 'rgba(31, 58, 95, 0.15)',
    borderColor: '#1F3A5F',
    borderWidth: 3,
    pointBackgroundColor: '#00C6FF',
    pointBorderColor: '#FFF',
    pointRadius: 4,
    pointHoverRadius: 6,
    data: [85, 90, 70, 80, 65, 88]
  }]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10
    }
  },
  scales: {
    r: {
      angleLines: { color: '#E5E7EB' },
      grid: { color: '#E5E7EB' },
      pointLabels: { 
        color: '#9CA3AF', 
        font: { size: 7.5, weight: '750' },
        padding: 4
      },
      ticks: { display: false },
      suggestedMin: 0,
      suggestedMax: 110
    }
  },
  plugins: { legend: { display: false } }
}
</script>

<template>
  <div class="h-full w-full"> <Radar :data="chartData" :options="chartOptions" /> </div>
</template>
