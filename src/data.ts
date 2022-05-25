import type { Weight, WeightData } from './types'

const data: WeightData = {
  name: 'Taro Yamada',
  unit: 'kg',
  weights: [
    { date: '2022-01-01', weight: 60.25 },
    { date: '2022-01-02', weight: 60.45 },
    { date: '2022-01-04', weight: 61.05 },
    { date: '2022-01-05', weight: 60.3 },
    { date: '2022-01-07', weight: 60.15 },
    { date: '2022-01-09', weight: 60.2 },
    { date: '2022-01-10', weight: 60.2 },
    { date: '2022-01-11', weight: 63.1 },
    { date: '2022-01-12', weight: 59.8 },
    { date: '2022-01-13', weight: 59.45 },
    { date: '2022-01-15', weight: 59.1 },
    { date: '2022-01-16', weight: 58.9 },
    { date: '2022-01-17', weight: 58.8 },
    { date: '2022-01-18', weight: 59.2 },
    { date: '2022-01-20', weight: 58.75 },
    { date: '2022-01-22', weight: 58.55 },
    { date: '2022-01-23', weight: 59.0 },
    { date: '2022-01-24', weight: 59.5 },
    { date: '2022-01-25', weight: 59.85 },
    { date: '2022-01-26', weight: 60.1 },
    { date: '2022-01-28', weight: 59.1 },
    { date: '2022-01-29', weight: 58.75 },
    { date: '2022-01-30', weight: 58.45 },
    { date: '2022-01-31', weight: 58.2 },
    { date: '2022-02-01', weight: 58.6 },
  ],
}

export function getRange(weights: Weight[]) {
  const min = Math.min(...weights.map((i) => i.weight))
  const max = Math.max(...weights.map((i) => i.weight))
  return { min, max }
}

export default data
