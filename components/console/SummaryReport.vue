<template>
  <div class='summary-layout'>

    <div class="table-wrap">
      <div class="mdl-data-table mdl-shadow--2dp">
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
      <h5 class="mdl-typography--text-center">血糖趨勢</h5>
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
              'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            // xAxes: [{
            //   time: {
            //     unit: 'day'
            //   }
            // }],
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
  padding: 0.5rem

.canvas-wrap
  padding: 0.5rem
  padding-top: 1.5rem

.mdl-data-table
  display: table
  width: 100%
</style>
