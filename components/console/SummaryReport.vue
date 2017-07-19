<template>
  <div class='summary-layout'>

    <div class="table-wrap summary-chart-seven-days">
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
            <td>{{ bgSet7day.max }}</td>
            <td>{{ bgSet7day.min }}</td>
            <td>{{ bgSet7day.average }}</td>
          </tr>
        </tbody>
      </div>
      <div class="canvas-wrap">
        <canvas id="summary-chart-seven-days" height="200px"></canvas>
      </div>
    </div>
    

    <div class="table-wrap summary-chart-thirty-days">
      <h3 class="mdl-typography--text-center">過去三十天統計</h3>
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
            <td>{{ bgSet30day.max }}</td>
            <td>{{ bgSet30day.min }}</td>
            <td>{{ bgSet30day.average }}</td>
          </tr>
        </tbody>
      </div>
      <div class="canvas-wrap">
        <canvas id="summary-chart-thirty-days" height="200px"></canvas>
      </div>
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
    plot (chartData, divID) {
      const ctx = document.getElementById(divID)
      console.log(ctx)
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
    this.plot(this.bgSet7day.chartData, 'summary-chart-seven-days')
    this.plot(this.bgSet30day.chartData, 'summary-chart-thirty-days')
    // this.chartElement.update()
  },
  computed: {
    chartData () {
      return this.$store.state.chartData
    },
    bgSet7day () {
      return this.$store.state.bgSet7day
    },
    bgSet30day () {
      return this.$store.state.bgSet30day
    }
  }
}

</script>


<style lang="sass">
.table-wrap
  padding: 0.5rem 0 
  h5
    padding: 0.5rem

.summary-layout
  z-index: 0;
  height: calc(100vh - 55px - 40px);
  overflow: scroll;
  background-color: white
  padding-bottom: 5px
  -webkit-overflow-scrolling: touch;

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
