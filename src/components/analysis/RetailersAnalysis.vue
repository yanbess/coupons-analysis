<script>
import CouponsAnalysisByRetails from '../../services/coupons-analysis/CouponsAnalysisByRetails'
import * as d3 from 'd3'

const colorMin = '#0cf0e9'
const colorMax = '#c62dcdcc'
const colorAvg = '#69b3a2'
const colorDef = 'steelblue'

function barChart(data = [], minNumber, maxNumber, avgNumber) {
  const element = 'svg'
  const width = 640
  const height = 400
  const barOffset = 0.1
  const marginBottom = 50
  const marginLeft = 70
  const marginRight = 10

  const maxDomain = d3.max(data, (d) => d.number)

  const xScale = d3
    .scaleLinear()
    .domain([0, maxDomain])
    .range([marginLeft, width - marginRight])

  const xAxis = d3.axisBottom(xScale).ticks(maxDomain / 5)

  const yScale = d3
    .scaleBand()
    .range([0, height - marginBottom])
    .domain(d3.range(data.length))
    .padding(barOffset)

  const yAxis = d3.axisLeft(yScale).tickFormat((d, i) => data[i].retail)

  const svg = d3
    .select(element)
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [0, 0, width, height])

  svg
    .append('g')
    .attr('transform', `translate(0, ${height - marginBottom})`)
    .call(xAxis)
    .call((g) =>
      g
        .selectAll('.tick line')
        .clone()
        .attr('y2', -height)
        .attr('stroke-opacity', 0.1)
    )

  svg
    .append('g')
    .attr('class', 'retail-axis')
    .attr('transform', `translate(${marginLeft}, 0)`)
    .call(yAxis)

  svg
    .append('text')
    .attr('x', width - marginRight - 50)
    .attr('y', height - 10)
    .attr('fill', 'currentColor')
    .text('Amount')

  const bars = svg.selectAll('.bars').data(data)

  bars
    .enter()
    .append('rect')
    .attr('height', yScale.bandwidth())
    .attr('x', (d, n) => marginLeft)
    .attr('fill', (d, n) => {
      if (data[n].number === minNumber) {
        return colorMin
      } else if (data[n].number === maxNumber) {
        return colorMax
      } else if (data[n].number === avgNumber) {
        return colorAvg
      } else {
        return colorDef
      }
    })

    .attr('y', function (d, n) {
      return yScale(n)
    })
    .attr('width', function (d, n) {
      return 0
    })
    .attr('class', 'bar')
    .transition()
    .duration(800)
    .attr('width', (d) => xScale(d.number) - marginLeft)
    .delay(function (d, i) {
      return i * 100
    })
}

export default {
  name: 'RetailersAnalysis',
  props: ['coupons'],
  data() {
    return {
      data: [],
      colorMin: colorMin,
      colorMax: colorMax,
      colorAvg: colorAvg
    }
  },
  mounted() {
    this.showBarChart()
  },
  methods: {
    showBarChart() {
      const service1 = new CouponsAnalysisByRetails()

      const data = service1.getRetails()

      const maxAmount = service1.getMaxAmountDiscountRetail(data)
      const minAmount = service1.getMinAmountDiscountRetail(data)
      const avgAmount = service1.getAvgAmountDiscountRetail(data)

      barChart(data, minAmount, maxAmount, avgAmount)
    }
  }
}
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title mb-4">
        Las mismas estadísticas pero agrupado por retailer
      </h4>

      <div class="container">
        <div class="row align-items-start">
          <div class="col">
            <svg style="max-width: 100%; height: auto" ref="chart"></svg>
            <div id="account_group"></div>
          </div>
          <div class="col">
            <ul class="legend-list">
              <li>
                <div
                  class="legend-item-color-box"
                  :style="{ background: colorMin }"
                >
                  &nbsp;
                </div>
                Min
              </li>
              <li>
                <div
                  class="legend-item-color-box"
                  :style="{ background: colorMax }"
                >
                  &nbsp;
                </div>
                Max
              </li>
              <li>
                <div
                  class="legend-item-color-box"
                  :style="{ background: colorAvg }"
                >
                  &nbsp;
                </div>
                Average
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.bar:hover {
  fill: #7eacd2;
  pointer-events: all;
}
.retail-axis {
  font: 14px sans-serif;
}
</style>
<style scoped>
.legend-list {
  list-style: none;
}

.legend-list > li {
  margin-bottom: 0.5rem;
}

.legend-item-color-box {
  width: 1.5rem;
  height: 1.5rem;
  text-align: center;
  color: #fff;
  display: inline-block;
  margin-right: 0.3rem;
}
</style>
