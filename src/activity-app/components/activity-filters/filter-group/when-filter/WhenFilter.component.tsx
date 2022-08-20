import { useTranslation } from 'react-i18next'
import { Form } from '@cobalt/cobalt-react-components'
import { Dropdown } from '@titanium/components'
import { ALL, LAST_MONTH, LAST_SIX_HOURS, LAST_TWENTY_FOUR_HOURS, LAST_WEEK } from 'activity-app/constants/filters.constants'

// .propTypes = {
//   selectedWhen: PropTypes.oneOf([...Object.keys(values)]),
//   onChange: PropTypes.func.isRequired
// }

interface Props {
  value: string;
  onChange: (value: string) => void
}

const WhenFilter = ({ value = ALL, onChange }: Props) => {
  const onChangeHandler = event => onChange(event.target.value)
  const [t] = useTranslation()
  const items = [
    {
      label: t('fields.date.allTime'),
      value: ALL,
      hasBorderBottom: true
    },
    { label: t('fields.date.last6Hours'), value: LAST_SIX_HOURS },
    {
      label: t('fields.date.last24Hours'),
      value: LAST_TWENTY_FOUR_HOURS
    },
    { label: t('fields.date.lastWeek'), value: LAST_WEEK },
    { label: t('fields.date.lastMonth'), value: LAST_MONTH }
  ]

  return (
    <div className="when-filter">
      <Form.Field label={t('fields.date.label')}>
        <Dropdown
          dataTestId="activity-filters__when"
          onChange={onChangeHandler}
          selectedValue={value}
        >
          {items.map(item => (
            <Dropdown.Option
              key={item.value}
              value={item.value}
              hasBorderBottom={item.hasBorderBottom}
            >
              {item.label}
            </Dropdown.Option>
          ))}
        </Dropdown>
      </Form.Field>
    </div>
  )
}

export default WhenFilter
