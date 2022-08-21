import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { NavHeader } from '@titanium/components'
import { FilterGroup } from './filter-group'

const Title = styled.h2`
  outline: 0;
`

const VoicemailsFilters = ({ onClose }) => {
  const [t] = useTranslation()
  return (
    <>
      <NavHeader
        borderless
        title={
          <Title tabIndex="0" data-testid="voicemails-filters__title">
            {t('filters.title')}
          </Title>
        }
        onClose={onClose}
      />
      <FilterGroup onClose={onClose} />
    </>
  )
}

export default VoicemailsFilters
