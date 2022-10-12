<script>
import RelevantKeywordsFromCoupons from '../services/RelevantKeywordsFromCoupons.js'

export default {
  name: 'RelevantKeywords',
  data() {
    return {
      result: []
    }
  },
  mounted() {
    const service = new RelevantKeywordsFromCoupons()
    this.result = service.getKeywords(15)
  }
}
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title mb-4">
        Extraer las palabras clave relevantes de ‘title’ y ‘description’ (TOP 15 words)
      </h4>
      <div class="container">
        <div class="row align-items-start">
          <div class="col">
            <ul>
              <li v-for="item in result">{{ item[1] }} ({{ item[0] }})</li>
            </ul>
            <p>Excluded words: a, to, off, with, get, my, add</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
