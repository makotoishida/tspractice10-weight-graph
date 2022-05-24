import { html, svg, render } from 'lit-html'
import 'normalize.css'
import './style.css'
import { WeightData } from './types'
import data from './data'

const appRoot = document.querySelector<HTMLDivElement>('#app')!

const DataTable = (data: WeightData) => {
  return html`<table class="data-table">
    <tr>
      <th class="left">Date</th>
      <th class="right">Weight (${data.unit})</th>
    </tr>
    ${data.weights.map(
      (i) =>
        html`<tr>
          <td class="left">${i.date}</td>
          <td class="right">${i.weight}</td>
        </tr>`
    )}
  </table>`
}

const Graph = (data: WeightData) => {
  const graphW = 600
  const graphH = 300
  const dx = 600 / data.weights.length
  const maxWeight = 62
  const minWeight = 57
  let prevX = 0
  let prevY = 0

  return html`<svg
    version="1.1"
    width="90vw"
    height="45vw"
    viewBox="0 0 ${graphW} ${graphH}"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0" y="0" width="100%" height="100%" fill="#ffffff" />

    ${data.weights.map((i, ix) => {
      const curX = ix * dx
      const curY =
        graphH - ((i.weight - minWeight) * graphH) / (maxWeight - minWeight)

      const s =
        ix === 0
          ? ''
          : svg`<line x1=${prevX} y1=${prevY} x2=${curX} y2=${curY} stroke="#44f" />`
      prevX = curX
      prevY = curY
      return s
    })}
  </svg>`
}

const App = (data: WeightData) => {
  return html`<div>
    <h3>${data.name}</h3>
    ${Graph(data)} ${DataTable(data)}
  </div>`
}

const renderApp = () => {
  render(App(data), appRoot)
}

renderApp()
