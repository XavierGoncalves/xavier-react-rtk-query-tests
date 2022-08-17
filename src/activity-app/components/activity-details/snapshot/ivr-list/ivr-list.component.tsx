import { Paragraph } from '@cobalt/cobalt-react-components'

interface Props {
  ivrs: string[];
  title?: string;
}

const IvrList = ({ ivrs, title = 'IVR' }: Props) => (
  <>
    <Paragraph microcopy>{title}</Paragraph>
    {ivrs.map((ivr, index) => (
      <Paragraph truncated key={index}>
        {ivr}
      </Paragraph>
    ))}
  </>
)

export default IvrList
