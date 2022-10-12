<script>
import CouponsAnalysisByType from '../../services/coupons-analysis/CouponsAnalysisByType'
import * as d3 from 'd3'

const colorMin = '#0cf0e9'
const colorMax = '#c62dcdcc'
const colorAvg = '#69b3a2'
const colorDef = 'steelblue'

function barChart(data = [], minNumber, maxNumber, avgNumber, item) {
  const element = 'svg'
  const width = 640
  const height = 400
  const barOffset = 0.1
  const marginBottom = 30
  const marginLeft = 30
  const marginTop = 30

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.number)])
    .range([height - marginBottom, marginTop])

  const yAxis = d3.axisLeft(yScale)

  const xScale = d3
    .scaleBand()
    .range([marginLeft, width])
    .domain(d3.range(data.length))
    .padding(barOffset)

  const xAxis = d3.axisBottom(xScale).tickFormat((d, i) => data[i].value + item)

  const svg = d3
    .select(element)
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [0, 0, width, height])

  svg
    .append('g')
    .attr('transform', `translate(${marginLeft}, 0)`)
    .call(yAxis)
    .call((g) =>
      g
        .selectAll('.tick line')
        .clone()
        .attr('x2', width - marginLeft)
        .attr('stroke-opacity', 0.1)
    )

  svg
    .append('g')
    .attr('transform', `translate(0,${height - marginBottom})`)
    .call(xAxis)

  svg
    .append('text')
    .attr('x', 5)
    .attr('y', 15)
    .attr('fill', 'currentColor')
    .text('Amount')

  const bars = svg.selectAll('.bars').data(data)

  bars
    .enter()
    .append('rect')
    .attr('width', xScale.bandwidth())
    .attr('x', (d, n) => xScale(n))
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

    .attr('y', function () {
      return yScale(0)
    })
    .attr('height', function () {
      return height - marginBottom - yScale(0)
    })
    .attr('class', 'bar')
    .transition()
    .duration(800)
    .attr('y', function (d) {
      return yScale(d.number)
    })
    .attr('height', (d) => height - marginBottom - yScale(d.number))
    .delay(function (d, i) {
      return i * 100
    })
}

export default {
  name: 'DiscountTypeAnalysis',
  data() {
    return {
      data: [],
      colorMin: colorMin,
      colorMax: colorMax,
      colorAvg: colorAvg,
      types: [
        { name: 'Percent-off', key: 'percent-off', item: '%' },
        { name: 'Dollar-off', key: 'dollar-off', item: ' USD' }
      ],
      selectedType: 0
    }
  },
  watch: {
    selectedType() {
      this.$refs.chart.innerHTML = ''
      this.showBarChart()
    }
  },
  mounted() {
    this.showBarChart()
  },
  methods: {
    showBarChart() {
      const service = new CouponsAnalysisByType(
        this.types[this.selectedType].key
      )
      const data = service.getDiscountGroups()

      const maxAmount = service.getMaxAmountDiscountGroups(data)
      const minAmount = service.getMinAmountDiscountGroups(data)
      const avgAmount = service.getAvgAmountDiscountGroups(data)

      barChart(
        data,
        minAmount,
        maxAmount,
        avgAmount,
        this.types[this.selectedType].item
      )
    }
  }
}
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title mb-4">
        De los cupones percent-off/dollar-off, cuantos hay con cada descuento,
        mínimo, máximo, promedio
      </h4>

      <div class="container">
        <div class="row align-items-start">
          <div class="col-4 mb-4">
            <select class="form-select" v-model="selectedType">
              <option
                :key="item.key"
                v-for="(item, index) in types"
                :value="index"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
        </div>
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
