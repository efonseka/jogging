import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { seatLabelToIndex, seatIndexToLabel, convertSeatLabel, DEFAULT_LAYOUT } from './seatConversion.js'

describe('seatLabelToIndex', () => {
  it('parses standard layout seat labels', () => {
    const result = seatLabelToIndex('12C')
    assert.deepEqual(result, { row: 12, seatIndex: 2, seatCode: 'C' })
  })

  it('supports trimmed lowercase inputs', () => {
    const result = seatLabelToIndex(' 1f ')
    assert.deepEqual(result, { row: 1, seatIndex: 5, seatCode: 'F' })
  })

  it('supports custom layouts with multi-letter seats', () => {
    const layout = ['A', 'B', 'AA', 'BB']
    const result = seatLabelToIndex('9AA', layout)
    assert.deepEqual(result, { row: 9, seatIndex: 2, seatCode: 'AA' })
  })

  it('rejects unknown seat codes', () => {
    assert.throws(() => seatLabelToIndex('3G'), /Seat code "G"/)
  })
})

describe('seatIndexToLabel', () => {
  it('converts index back to label for default layout', () => {
    const label = seatIndexToLabel(5, 1)
    assert.equal(label, '5B')
  })

  it('converts using custom layouts', () => {
    const layout = ['W', 'A', 'M']
    const label = seatIndexToLabel(20, 2, layout)
    assert.equal(label, '20M')
  })

  it('throws when index out of range', () => {
    assert.throws(() => seatIndexToLabel(2, 10), /outside the seat layout range/)
  })
})

describe('convertSeatLabel', () => {
  it('converts between layouts', () => {
    const fromLayout = DEFAULT_LAYOUT
    const toLayout = ['Window', 'Middle', 'Aisle', 'Aisle', 'Middle', 'Window']
    const converted = convertSeatLabel('7A', fromLayout, toLayout)
    assert.equal(converted, '7Window')
  })
})
