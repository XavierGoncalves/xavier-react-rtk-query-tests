import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { DatePicker } from '@titanium/components'
import * as values from '../../../../constants/filters'

export const WhenFilter = ({
  selectedWhen = { value: values.ALL, customRange: { start: null, end: null } },
  onChange
}) => {
  const [t] = useTranslation()

  return (
    <DatePicker
      customLabel={t('fields.when.custom')}
      label={t('fields.when.label')}
      onChange={onChange}
      selected={selectedWhen}
    >
      <DatePicker.Option
        label={t('fields.when.allTime')}
        value={values.ALL}
        hasBorderBottom
      />
      <DatePicker.Option
        label={t('fields.when.last6Hours')}
        value={values.LAST_SIX_HOURS}
      />
      <DatePicker.Option
        label={t('fields.when.lastDay')}
        value={values.LAST_DAY}
      />
      <DatePicker.Option
        label={t('fields.when.lastWeek')}
        value={values.LAST_WEEK}
      />
      <DatePicker.Option
        label={t('fields.when.lastMonth')}
        value={values.LAST_MONTH}
      />
    </DatePicker>
  )
}

WhenFilter.propTypes = {
  selectedWhen: PropTypes.object,
  onChange: PropTypes.func.isRequired
}
