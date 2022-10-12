<script>
import CouponsTypesAnalysis from '../../services/coupons-analysis/CouponsTypesAnalysis'
import * as d3 from 'd3'

function pieChart(data = [], colors = []) {
  const width = 400
  const height = 400
  const radius = Math.min(width, height) / 2
  const T = Math.PI / 180

  const svg = d3
    .select('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [-width / 2, -height / 2, width, height])
    .attr('style', 'max-width: 100%; height: auto; height: intrinsic;')

  const g = svg.append('g')

  const color = d3.scaleOrdinal(colors)

  const pie = d3.pie().value((d) => d.number)

  const arc = d3.arc().innerRadius(0).outerRadius(radius)

  const arcs = g
    .selectAll('arc')
    .data(pie(data))
    .enter()
    .append('g')
    .attr('class', 'arc')

  arcs
    .append('path')
    .attr('fill', function (d, i) {
      return color(i)
    })
    .attr('d', arc)
    .attr('stroke', '#fff')
    .style('stroke-width', '2px')
    .on('mousemove', function () {
      d3.select(this).style('opacity', 0.7)
    })
    .on('mouseout', function () {
      d3.select(this).style('opacity', 1)
    })

  g.selectAll('arc')
    .data(pie(data))
    .enter()
    .append('text')
    .attr('transform', function (d) {
      return 'translate(' + arc.centroid(d) + ')'
    })
    .text(function (d, i) {
      return data[i].number
    })
    .style('font-family', 'arial')
    .style('font-size', 15)

  var arcPlug = d3
    .arc()
    .innerRadius(0)
    .outerRadius(radius + 1)

  const p = svg
    .append('path')
    .datum({
      endAngle: 0 * T,
      startAngle: -360 * T
    })
    .attr('d', arcPlug)
    .attr('fill', '#fff')

  p.transition()
    .duration(1000)
    .call(arcTween, 0 * T, 0 * T)

  function arcTween(transition, newStartAngle, newFinishAngle) {
    transition.attrTween('d', function (d) {
      var interpolateStart = d3.interpolate(d.startAngle, newStartAngle)
      return function (t) {
        d.endAngle = newFinishAngle
        d.startAngle = interpolateStart(t)
        return arc(d)
      }
    })
  }
}

export default {
  name: 'TypesAnalysis',
  data() {
    return {
      data: [],
      colors: null
    }
  },
  mounted() {
    this.getAnalysis()
    this.colors = d3.schemeSpectral[this.data.length]
    pieChart(this.data, this.colors)
  },
  methods: {
    getAnalysis() {
      const service = new CouponsTypesAnalysis()
      this.data = service.getTypes()
    }
  }
}
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title mb-4">Cuántos cupones hay de cada tipo</h4>

      <div class="container">
        <div class="row align-items-start">
          <div class="col"><svg></svg></div>
          <div class="col">
            <ul class="legend-list">
              <li v-for="(item, index) in data">
                <div
                  class="legend-item-color-box"
                  :style="{ background: colors[index] }"
                >
                  {{ item.number }}
                </div>
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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

.arc:hover {
  fill: #ccc;
  opacity: 0.5;
}
</style>
