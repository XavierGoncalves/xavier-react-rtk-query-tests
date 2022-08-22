import React from 'react'
import { render } from '@testing-library/react'
import { LoadingRow } from '..'

describe('<LoadingRow />', () => {
  describe('when small prop is false', () => {
    it('renders the large loading row', () => {
      const { container } = renderComponent(false)

      expect(container).toMatchSnapshot()
    })
  })

  describe('when small prop is true', () => {
    it('renders the small loading row', () => {
      const { container } = renderComponent(true)

      expect(container).toMatchSnapshot()
    })
  })
})

const renderComponent = small =>
  render(
    <table>
      <tbody>
        <LoadingRow small={small} />
      </tbody>
    </table>
  )
