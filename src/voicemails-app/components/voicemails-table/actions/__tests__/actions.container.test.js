import { mapStateToProps } from '../actions.container'
import { CONTACTS_CREATE } from '../../../../constants/policies'

describe('Actions container', () => {
  describe('#mapStateToProps', () => {
    let state
    let props

    beforeEach(() => {
      state = {
        user: {
          policies: {
            [CONTACTS_CREATE]: true
          }
        }
      }
      props = mapStateToProps(state)
    })

    it('maps the contact create permission from state to props', () => {
      expect(props.canCreateContact).toEqual(true)
    })
  })
})
