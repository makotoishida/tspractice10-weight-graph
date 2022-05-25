import { html, svg, render } from 'lit-html'
import 'normalize.css'
import './style.css'
import { WeightData } from './types'
import data, { getRange } from './data'

const graphW = 600
const graphH = 300
const paddingH = 20
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

const Dates = (data: WeightData) => {
  const dx = graphW / data.weights.length
  return data.weights.map((i, ix) => {
    let s = i.date.substring(i.date.length - 5).replace('-', '/')
    if (s.startsWith('0')) s = s.substring(1)

    return (i.date.endsWith('01') || i.date.endsWith('5')) && ix > 0
      ? svg`<text x=${ix * dx} y=${
          graphH - paddingH * 0.5
        } text-anchor="middle" font-size="80%">${s}</text>`
      : null
  })
}

const VerticalScale = (data: WeightData) => {
  const dx = graphW / data.weights.length
  return data.weights.map((_, ix) => {
    const x = ix * dx
    return svg`<line x1=${x} y1=${0} x2=${x} y2=${graphH} stroke="#ccc" stroke-dasharray="2 2" />`
  })
}

const HorizontalScale = (data: WeightData) => {
  const { min, max } = getRange(data.weights)
  const range = max - min
  const height = graphH - paddingH * 2
  const dy = height / range

  const arr: { y: number; value: number }[] = []
  const start = Math.floor(min)
  for (let i = start; i <= max + 1; i++) {
    const y = ((graphH - (i - min) * dy) | 0) - paddingH
    arr.push({ y, value: i })
  }
  return arr.map(
    (i) =>
      svg`<line x1=${0} y1=${i.y} x2=${graphW} y2=${
        i.y
      } stroke="#ccc" stroke-dasharray="2 2" />
      <text x=${5} y=${i.y} font-size="80%" stroke="blue" >${i.value}</text>`
  )
}

const Graph = (data: WeightData) => {
  const dx = graphW / data.weights.length
  let prevX = 0
  let prevY = 0
  const { min, max } = getRange(data.weights)
  const range = max - min
  const height = graphH - paddingH * 2

  return html`<svg
    version="1.1"
    width="90vw"
    height="45vw"
    viewBox="0 0 ${graphW} ${graphH}"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0" y="0" width="100%" height="100%" fill="#ffffff" />
    ${VerticalScale(data)} ${HorizontalScale(data)} ${Dates(data)}
    ${data.weights.map((i, ix) => {
      const curX = ix * dx
      const curY = graphH - ((i.weight - min) * height) / range - paddingH

      const s =
        ix === 0
          ? ''
          : svg`<line x1=${prevX} y1=${prevY} x2=${curX} y2=${curY} stroke="#44f" stroke-width="5" stroke-linecap="round" />`
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
