import { useTranslation } from 'react-i18next'
import {
  Form,
  Icon,
  Dropdown as CoDropdown
} from '@cobalt/cobalt-react-components'
import { Dropdown } from '@titanium/components'
import { getActivityType } from '@titanium/activity-details'
import * as activityTypes from 'activity-app/constants/activity-types.constants'
import { ALL } from 'activity-app/constants/filters.constants'

const activitiesVoiceFilterItems = [
  activityTypes.INBOUND,
  activityTypes.MISSED_INBOUND,
  activityTypes.OUTBOUND,
  activityTypes.UNANSWERED_OUTBOUND,
  activityTypes.ABANDONED,
  activityTypes.TRANSFER
].map(type => ({ ...getActivityType(type), value: type }))

const activitiesTextFilterItems = [
  activityTypes.INBOUND_SMS,
  activityTypes.OUTBOUND_SMS
].map(type => ({ ...getActivityType(type), value: type }))


// .propTypes = {
//   selectedStatus: PropTypes.oneOf([...Object.keys(activityTypes), ALL])
//     .isRequired,
//   onChange: PropTypes.func.isRequired,
// }

const ActivityFilter = ({ value, onChange }) => {
  const onChangeHandler = e => onChange(e.target.value)
  const [t] = useTranslation()

  return (
    <Form.Field label={t('fields.activityType.label')}>
      <Dropdown
        dataTestId="activity-filters__activity"
        onChange={onChangeHandler}
        selectedValue={value}
      >
        <Dropdown.Option key={ALL} value={ALL} hasBorderBottom={true}>
          {t('fields.activityType.all')}
        </Dropdown.Option>
        <CoDropdown.OptionGroup title={t('optionGroups.voice')}>
            {activitiesVoiceFilterItems.map(item => (
              <Dropdown.Option key={item.value} value={item.value}>
                {item.icon ? (
                  <Icon name={item.icon} color={item.color} />
                ) : null}
                {t(item.name)}
              </Dropdown.Option>
            ))}
          </CoDropdown.OptionGroup>
          <CoDropdown.OptionGroup title={t('optionGroups.text')}>
            {activitiesTextFilterItems.map(item => (
              <Dropdown.Option key={item.value} value={item.value}>
                {item.icon ? (
                  <Icon name={item.icon} color={item.color} />
                ) : null}
                {t(item.name)}
              </Dropdown.Option>
            ))}
          </CoDropdown.OptionGroup>
      </Dropdown>
    </Form.Field>
  )
}



export default ActivityFilter
