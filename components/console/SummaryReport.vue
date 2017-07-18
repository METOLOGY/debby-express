<template>
  <div class='summary-layout'>

    <div class="table-wrap">
      <h3 class="mdl-typography--text-center">過去七天統計</h3>
      <div class="summary-table">
        <thead>
          <tr>
            <th>最高血糖</th>
            <th>最低血糖</th>
            <th>平均血糖</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ bgSet.max }}</td>
            <td>{{ bgSet.min }}</td>
            <td>{{ bgSet.average }}</td>
          </tr>
        </tbody>
      </div>
    </div>
    <div class="canvas-wrap">
      <canvas id='summary-chart' height="200px"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  name: 'SummaryReport',
  data () {
    return {
      chartElement: ''
    }
  },
  created () {
    // this.$store.commit('GET_TOTAL_DATA')
  },
  methods: {
    plot (chartData) {
      const ctx = document.getElementById('summary-chart')
      const mychart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: chartData.label,
          datasets: [{
            data: chartData.data,
            backgroundColor: [
              'rgba(17, 88, 168, 0.2)'
            ],
            borderColor: [
              'rgba(17, 88, 168, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      })

      console.log(mychart)
    }
  },
  mounted () {
    // this.plot(this.chartData)
  },
  beforeUpdate () {
    console.log('beforeupdate')
    this.plot(this.chartData)
    // this.chartElement.update()
  },
  computed: {
    chartData () {
      return this.$store.state.chartData
    },
    bgSet () {
      return this.$store.state.bgSet
    }
  }
}

</script>


<style lang="sass">
.table-wrap
  padding: 0.5rem 0 
  h5
    padding: 0.5rem
  

.canvas-wrap
  padding: 0.5rem
  padding-top: 1.5rem

.mdl-data-table
  display: table
  width: 100%

.summary-table
  display: table
  border: 1px solid rgba(0,0,0,0.3)
  border-right: 0;
  border-left: 0;
  width: 100%
  th
    border-bottom: 1px solid rgba(0,0,0,0.3)
    background-color: rgb(237,111,5);
    color: white;
    font-weight: 100;
  th, td
    padding: 1rem
    text-align: center

</style>
