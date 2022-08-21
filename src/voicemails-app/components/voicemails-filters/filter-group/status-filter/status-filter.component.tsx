import React from 'react'
import PropTypes from 'prop-types'
import { Form, Icon } from '@cobalt/cobalt-react-components'
import { useTranslation } from 'react-i18next'
import { Dropdown } from '@titanium/components'
import { ALL } from '../../../../constants/filters'
import {
  VOICEMAIL_OPEN,
  VOICEMAIL_RESOLVED
} from '../../../../constants/state.types'
import {
  VOICEMAIL_OPEN_COLOR,
  VOICEMAIL_RESOLVED_COLOR
} from '../../../../constants/colors'

export const StatusFilter = ({ selectedStatus, onChange }) => {
  const [t] = useTranslation()
  const onChangeHandler = e => onChange(e.target.value)

  return (
    <div className="status-filter">
      <Form.Field label={t('fields.status.label')}>
        <Dropdown
          dataTestId="voicemail-filters__status"
          onChange={onChangeHandler}
          selectedValue={selectedStatus}
        >
          <Dropdown.Option hasBorderBottom value={ALL} key={ALL}>
            {t('fields.status.all')}
          </Dropdown.Option>
          <Dropdown.Option value={VOICEMAIL_OPEN} key={VOICEMAIL_OPEN}>
            <Icon name={Icon.BULLET} color={VOICEMAIL_OPEN_COLOR} tiny />
            {t('fields.status.open')}
          </Dropdown.Option>
          <Dropdown.Option value={VOICEMAIL_RESOLVED} key={VOICEMAIL_RESOLVED}>
            <Icon name={Icon.DONE} color={VOICEMAIL_RESOLVED_COLOR} tiny />
            {t('fields.status.resolved')}
          </Dropdown.Option>
        </Dropdown>
      </Form.Field>
    </div>
  )
}

StatusFilter.propTypes = {
  selectedStatus: PropTypes.oneOf([ALL, VOICEMAIL_OPEN, VOICEMAIL_RESOLVED])
    .isRequired,
  onChange: PropTypes.func.isRequired
}
