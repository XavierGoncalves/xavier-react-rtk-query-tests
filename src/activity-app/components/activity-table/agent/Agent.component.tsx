import { Text, Paragraph } from '@cobalt/cobalt-react-components'
import { useTranslation } from 'react-i18next'
import { useFormattedPhoneNumber } from '@titanium/components'
import { ActivityAgent, ActivityNumber } from 'types'

interface Props {
  agent: ActivityAgent;
  number: ActivityNumber
}

const Agent = ({ agent, number }: Props) => {
  const [t] = useTranslation()
  const [formattedPhoneNumber] = useFormattedPhoneNumber(number.number)

  return (<>
    {
      agent.name ? (
        <>
          <Text truncated>{agent.name}</Text>
          <Paragraph truncated microcopy>
            {t('fields.agent.via', {
              friendlyName: number.friendlyName,
              number: formattedPhoneNumber
            })}
          </Paragraph>
        </>
      ) : (
        t('fields.agent.noAgent')
      )
    }
  </>)

}

export default Agent
