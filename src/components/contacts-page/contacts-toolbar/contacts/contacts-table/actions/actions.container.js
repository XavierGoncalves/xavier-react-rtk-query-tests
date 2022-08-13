import { connect } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import {
  getCanUpdateContact,
  getCanDeleteContact
} from '../../../../../selectors/policies'
import { Actions as Component } from './actions.component'

export const mapStateToProps = createSelector(
  getCanUpdateContact,
  getCanDeleteContact,
  (canUpdateContact, canDeleteContact) => ({
    canUpdateContact,
    canDeleteContact
  })
)

export const Actions = connect(mapStateToProps, null)(Component)
