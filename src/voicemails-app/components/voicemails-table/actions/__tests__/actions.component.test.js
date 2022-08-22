import React from 'react'
import each from 'jest-each'
import { render, fireEvent, screen } from '@testing-library/react'
import { Viewport } from '@cobalt/cobalt-react-components'
import { useVoiceConversation } from '@titanium/hooks'
import { Actions } from '../actions.component'

jest.mock('@titanium/hooks', () => ({
  useVoiceConversation: jest.fn()
}))

describe('<Actions />', () => {
  let props
  let onPlayVoicemailFn
  let onChangeStatusFn
  let onAssignToClickFn
  let onClickToCallFn
  let onAddContactFn

  beforeEach(() => {
    onPlayVoicemailFn = jest.fn()
    onChangeStatusFn = jest.fn()
    onAssignToClickFn = jest.fn()
    onClickToCallFn = jest.fn()
    onAddContactFn = jest.fn()

    props = {
      id: '1',
      status: 'STATE_VOICEMAIL_OPEN',
      loading: false,
      currentUser: {
        id: 'ME',
        name: 'John Doe',
        permissions: {
          canAssignVoicemail: false,
          canListenVoicemail: false,
          canChangeVoicemailStatus: false
        }
      },
      contact: {
        id: '1'
      },
      contactPhoneNumber: '912345678',
      numberOfVisibleButtons: 5,
      canCreateContact: true,
      onPlayVoicemail: onPlayVoicemailFn,
      onChangeStatus: onChangeStatusFn,
      onAssignToClick: onAssignToClickFn,
      onClickToCall: onClickToCallFn,
      onAddContact: onAddContactFn
    }

    useVoiceConversation.mockReturnValue([true, onClickToCallFn])
  })

  each`
    viewport
    ${'small'}
    ${'medium'}
    ${'large'}
  `.describe('when viewport size is $viewport', ({ viewport }) => {
    // Play button
    describe('when the user has permission to listen a recording', () => {
      beforeEach(() => {
        setUserPermissions({ canListenVoicemail: true })
      })

      it('renders the play button', () => {
        const { queryByTestId } = renderComponent()
        expect(queryByTestId('play-button')).toBeInTheDocument()
      })

      it('triggers onPlayVoicemail when the play button is clicked', () =>
        testButtonClick('play-button', onPlayVoicemailFn))
    })

    describe('when the user does not have permission to listen a recording', () => {
      beforeEach(() => {
        setUserPermissions({ canListenVoicemail: false })
      })

      it('does not render the play button', () => {
        const { queryByTestId } = renderComponent()
        expect(queryByTestId('play-button')).not.toBeInTheDocument()
      })
    })

    // Open and resolve buttons
    describe('when the user has permission to change a voicemail', () => {
      beforeEach(() => {
        setUserPermissions({ canChangeVoicemailStatus: true })
      })

      describe('and the voicemail is open', () => {
        beforeEach(() => {
          props = {
            ...props,
            status: 'STATE_VOICEMAIL_OPEN'
          }
        })

        it('renders the resolve button', () => {
          const { queryByTestId } = renderComponent()
          expect(queryByTestId('status-button--open')).toBeInTheDocument()
        })

        it('triggers onChangeStatus when the resolved button is clicked', () =>
          testButtonClick('status-button--open', onChangeStatusFn))
      })

      describe('and the voicemail is resolved', () => {
        beforeEach(() => {
          props = {
            ...props,
            status: 'STATE_VOICEMAIL_RESOLVED'
          }
        })

        it('renders the open button', () => {
          const { queryByTestId } = renderComponent()
          expect(queryByTestId('status-button--resolved')).toBeInTheDocument()
        })

        it('triggers onChangeStatus when the open button is clicked', () =>
          testButtonClick('status-button--resolved', onChangeStatusFn))
      })
    })

    describe('when the user does not have permission to change a voicemail', () => {
      beforeEach(() => {
        setUserPermissions({ canChangeVoicemailStatus: false })
      })

      it('does not render the open button', () => {
        const { queryByTestId } = renderComponent()
        expect(queryByTestId('status-button--open')).not.toBeInTheDocument()
      })

      it('does not render the resolve button', () => {
        const { queryByTestId } = renderComponent()
        expect(queryByTestId('status-button--resolved')).not.toBeInTheDocument()
      })
    })

    // Assign button
    describe('when the user has permission to assign a voicemail', () => {
      beforeEach(() => {
        setUserPermissions({ canAssignVoicemail: true })
      })

      if (viewport === 'small') {
        it('renders the assign button', () => {
          const { queryByTestId } = renderComponent()
          expect(queryByTestId('assign-button')).toBeInTheDocument()
        })

        it('triggers onAssignToClick when the assign button is clicked', () =>
          testButtonClick('assign-button', onAssignToClickFn))
      } else {
        it('does not render the assign button in non small screen', () => {
          const { queryByTestId } = renderComponent()
          expect(queryByTestId('assign-button')).not.toBeInTheDocument()
        })
      }
    })

    describe('when the user does not have permission to assign a voicemail', () => {
      beforeEach(() => {
        setUserPermissions({ canAssignVoicemail: false })
      })

      it('does not render the assign button', () => {
        const { queryByTestId } = renderComponent()
        expect(queryByTestId('assign-button')).not.toBeInTheDocument()
      })
    })

    it('renders the click to call button', () => {
      const { getByText } = renderComponent()
      expect(getByText('call')).toBeInTheDocument()
    })

    // Click to call
    describe('when the user clicks on click to call button', () => {
      describe('and conversation app is available', () => {
        it('triggers onClickToCall', () => {
          const { getByTestId } = renderComponent()

          fireEvent.click(getByTestId('call-button'))

          expect(onClickToCallFn).toHaveBeenCalledWith('912345678', '1')
        })
      })

      describe('and conversation app is not available', () => {
        beforeEach(() => {
          useVoiceConversation.mockReturnValue([false, onClickToCallFn])
        })

        it('does not trigger onClickToCall', () => {
          renderComponent()

          fireEvent(
            screen.getByRole('link', { name: /dial/i }),
            getClickEvent()
          )

          expect(onClickToCallFn).not.toHaveBeenCalled()
        })
      })
    })

    // Add to contacts
    describe('when the voicemail contact does not have an id', () => {
      beforeEach(() => {
        props = {
          ...props,
          contact: {
            id: null
          }
        }
      })

      it('renders the add to contact button', () => {
        const { queryByTestId } = renderComponent()
        expect(queryByTestId('add-to-contacts-button')).toBeInTheDocument()
      })

      it('does not render the add contact action if the user has no permission to add contacts', () => {
        props = {
          ...props,
          canCreateContact: false
        }
        const { queryByTestId } = renderComponent()
        expect(queryByTestId('add-to-contacts-button')).not.toBeInTheDocument()
      })

      describe('when the user clicks on the add to contacts button', () => {
        it('triggers onAddContact', () => {
          const { getByTestId } = renderComponent()

          fireEvent.click(getByTestId('add-to-contacts-button'))

          expect(onAddContactFn).toHaveBeenCalledWith({
            id: null,
            number: '912345678',
            voicemailId: '1'
          })
        })
      })
    })

    describe('when the voicemail contact was deleted', () => {
      beforeEach(() => {
        props = {
          ...props,
          contact: {
            ...props.contact,
            deleted: true
          }
        }
      })

      it('renders the add to contact button', () => {
        const { queryByTestId } = renderComponent()
        expect(queryByTestId('add-to-contacts-button')).toBeInTheDocument()
      })

      it('does not render the add contact action if the user has no permission to add contacts', () => {
        props = {
          ...props,
          canCreateContact: false
        }
        const { queryByTestId } = renderComponent()
        expect(queryByTestId('add-to-contacts-button')).not.toBeInTheDocument()
      })

      describe('when the user clicks on the add to contacts button', () => {
        it('triggers onAddContact', () => {
          const { getByTestId } = renderComponent()

          fireEvent.click(getByTestId('add-to-contacts-button'))

          expect(onAddContactFn).toHaveBeenCalledWith({
            id: '1',
            number: '912345678',
            voicemailId: '1'
          })
        })
      })
    })

    describe('when the voicemail contact has a name', () => {
      beforeEach(() => {
        props = { ...props, contact: { ...props.contact, name: 'John Doe' } }
      })

      it('does not render the add to contact button', () => {
        const { queryByTestId } = renderComponent()
        expect(queryByTestId('add-to-contacts-button')).not.toBeInTheDocument()
      })
    })

    const setUserPermissions = permissions => {
      props = {
        ...props,
        currentUser: {
          ...props.currentUser,
          permissions: {
            ...props.currentUser.permissions,
            ...permissions
          }
        }
      }
    }

    const testButtonClick = (buttonName, callback) => {
      const { getByTestId } = renderComponent()

      fireEvent.click(getByTestId(buttonName))

      expect(callback).toHaveBeenCalled()
    }

    const renderComponent = () =>
      render(
        <Viewport.Context.Provider value={viewport}>
          <Actions {...props} />
        </Viewport.Context.Provider>
      )
  })

  const getClickEvent = () => {
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true
    })
    clickEvent.preventDefault()

    return clickEvent
  }
})
