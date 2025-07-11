import Vue from 'vue'
import { Line, Doughnut } from 'vue-chartjs'

Vue.component('line-chart', {
    extends: Line,
    props: ['data', 'options'],
    mounted() {
        this.renderChart(this.data, this.options)
    }
})

Vue.component('doughnut-chart', {
    extends: Doughnut,
    props: ['data', 'options'],
    mounted() {
        this.renderChart(this.data, this.options)
    }
})