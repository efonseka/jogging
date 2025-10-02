const DEFAULT_LAYOUT = Object.freeze(['A', 'B', 'C', 'D', 'E', 'F'])

function prepareLayout(layout) {
  if (!Array.isArray(layout) || layout.length === 0) {
    throw new TypeError('layout must be a non-empty array of seat labels')
  }
  return layout.map(label => {
    if (typeof label !== 'string' || !label.trim()) {
      throw new TypeError('seat labels must be non-empty strings')
    }
    const trimmed = label.trim()
    return { original: trimmed, normalised: trimmed.toUpperCase() }
  })
}

export function seatLabelToIndex(label, layout = DEFAULT_LAYOUT) {
  if (typeof label !== 'string') {
    throw new TypeError('label must be a string')
  }
  const trimmed = label.trim()
  if (!trimmed) {
    throw new TypeError('label must not be empty')
  }

  const match = trimmed.match(/^(\d+)([A-Za-z]+)$/)
  if (!match) {
    throw new RangeError(`Invalid seat label: "${label}"`)
  }

  const [, rowPart, seatPart] = match
  const row = Number.parseInt(rowPart, 10)
  if (!Number.isSafeInteger(row) || row <= 0) {
    throw new RangeError(`Invalid seat row: "${rowPart}"`)
  }

  const normalisedLayout = prepareLayout(layout)
  const seatCode = seatPart.toUpperCase()
  const seatIndex = normalisedLayout.findIndex(entry => entry.normalised === seatCode)
  if (seatIndex === -1) {
    throw new RangeError(`Seat code "${seatCode}" is not part of the provided layout`)
  }

  return { row, seatIndex, seatCode: normalisedLayout[seatIndex].normalised }
}

export function seatIndexToLabel(row, seatIndex, layout = DEFAULT_LAYOUT) {
  if (!Number.isSafeInteger(row) || row <= 0) {
    throw new RangeError('row must be a positive integer')
  }
  if (!Number.isSafeInteger(seatIndex)) {
    throw new TypeError('seatIndex must be an integer')
  }

  const normalisedLayout = prepareLayout(layout)
  if (seatIndex < 0 || seatIndex >= normalisedLayout.length) {
    throw new RangeError('seatIndex is outside the seat layout range')
  }

  return `${row}${normalisedLayout[seatIndex].original}`
}

export function convertSeatLabel(label, fromLayout, toLayout) {
  const { row, seatIndex } = seatLabelToIndex(label, fromLayout)
  return seatIndexToLabel(row, seatIndex, toLayout)
}

export { DEFAULT_LAYOUT }
