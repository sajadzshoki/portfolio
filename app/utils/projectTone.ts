const tones = [
  '#6f9ed6',
  '#e08a68',
  '#6eae90',
  '#d4a24c',
  '#8d7dcc',
  '#4ea3b4',
  '#d67b96',
  '#87a34e',
  '#c98458',
  '#5b8fd4',
  '#b57cbc',
  '#3e9d90',
  '#d9a35c',
  '#6d7ed6',
  '#c86a62',
  '#5f9e72',
  '#a78455',
  '#4e86a8'
]

const order = [4, 11, 1, 14, 7, 16, 0, 9, 3, 12, 6, 15, 2, 10, 5, 17, 8, 13]

export function projectTone(index: number) {
  const slot = order[((index % order.length) + order.length) % order.length] ?? 0
  return tones[slot] ?? tones[0]
}
