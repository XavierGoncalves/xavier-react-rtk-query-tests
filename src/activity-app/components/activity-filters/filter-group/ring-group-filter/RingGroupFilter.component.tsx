import React, { useState, useEffect } from 'react'
import {
  Form,
  MultiDropdown,
  Paragraph,
  Loader
} from '@cobalt/cobalt-react-components'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import useGetRinGroupsForDropdown from 'activity-app/react-query/use-get-ringgroups-for-dropdown'
import isSearchTextTooShort from 'activity-app/utils/is-searchtext-too-short'

const DropdownWrapper = styled.div`
  ${props => {
    const { remainingRingGroups, isLoading } = props
    
    if (remainingRingGroups || isLoading) {
      const hideCheckbox = `div.co-dropdown__options:last-of-type {
        li.co-list__item:last-of-type {
          input[type='checkbox'] {
            display: none;
          }
        }
      }`
      const hideSelectAll = `
        ul.co--border-bottom {
          display: none;
        }
      `
      // return isLoading ? hideCheckbox + hideSelectAll : hideCheckbox
      return isLoading && hideCheckbox + hideSelectAll
    }
  }}

  .co-loader {
    margin: auto;
  }
`

// {
//   ringGroups: PropTypes.arrayOf(RingGroupPropType),
//   selectedRingGroups: PropTypes.arrayOf(PropTypes.string),
//   onChange: PropTypes.func.isRequired,
//   onRingGroupsFilterInit: PropTypes.func.isRequired,
//   onRingGroupsSearch: PropTypes.func.isRequired,
//   totalRingGroups: PropTypes.number.isRequired
// }

interface Props {
  value: string[];
  onChange: (value: string[]) => void
}

const RingGroupFilter = ({
  value,
  onChange,
}: Props) => {
  const [t] = useTranslation()
  const [noResultsMessage, setNoResultsMessage] = useState(null)
  const [searchText, setSearchText] = useState('')
  const { data, isFetching } = useGetRinGroupsForDropdown(searchText, value)
  const ringGroups = data?.ringGroups || []
  const totalRingGroups = data?.total || 0
  const remainingValue = totalRingGroups - ringGroups.length
  const remainingRingGroups = remainingValue > 0 ? remainingValue : null


  // useEffect(() => {
  //   if (!ringGroups.length) {
  //     setRingGroupsOptions([])
  //     setNoResultsMessage(t('ringGroupsDropdown.empty'))
  //   } else {
  //     const ringGroupsNames = ringGroups.map(ringGroup => ringGroup.name)
  //     const missingOptions = value
  //       .filter(name => !ringGroupsNames.includes(name))
  //       .map(name => ({ name }))

  //     setRingGroupsOptions([...ringGroups, ...missingOptions])
  //   }
  // }, [ringGroups])

  const onSearchRingGroupsHandler = (query: string) => {
    if (isSearchTextTooShort(query)) {
      setNoResultsMessage(t('ringGroupsDropdown.typeMore'))
    }
    if (ringGroups.length === 0) {
      setNoResultsMessage(t('ringGroupsDropdown.empty'))
    }
    setSearchText(query)
  }

  const onChangeHandler = e => {
    const selected = e.target.value ? e.target.value.split(',').sort() : []
    console.log('onChangeHandler->', selected)
    onChange(selected.length === value.length ? [] : selected)
    setSearchText('')
  }

  // const onFocusHandler = () => {
  //   if (query) {
  //     setSearchText(null)
  //     onRingGroupsFilterInit()
  //   }
  // }

  const renderRingGroupsOptions = () => {
    const options = ringGroups.map(ringGroup => (
      <MultiDropdown.Option
        key={ringGroup.name}
        value={ringGroup.name}
        selected={value.includes(ringGroup.name)}
        data-testid={`filters__ring-groups-${ringGroup.name}`}
      >
        {ringGroup.name}
      </MultiDropdown.Option>
    ))

    const remainingOption = remainingRingGroups ? (
      <MultiDropdown.Option
        value={''}
        key="filters__ring-groups-remaining-option"
        data-testid={'filters__ring-groups-remaining-option'}
      >
        <Paragraph microcopy truncated>
          {t('ringGroupsDropdown.refineSearch', {
            remainingRingGroups
          })}
        </Paragraph>
      </MultiDropdown.Option>
    ) : null

    return options.length && !isSearchTextTooShort(searchText)
      ? [...options, remainingOption]
      : []
  }

  return (
    <div className="filters__ring-groups">
      <Form.Field
        label={t('fields.ringGroups.label')}
        id="filters__ring-groups"
      >
        <DropdownWrapper
          remainingRingGroups={remainingRingGroups}
          isLoading={isFetching}
        >
          <MultiDropdown
            open
            id="filters__ring-groups-dropdown"
            searchable
            items={ringGroups}
            onChange={onChangeHandler}
            placeholder={t('ringGroupsDropdown.all')}
            selectAllLabel={t('ringGroupsDropdown.selectAll')}
            searchPlaceholder={t('ringGroupsDropdown.search')}
            onSearch={onSearchRingGroupsHandler}
            noResultsMessage={noResultsMessage}
          // onFocus={onFocusHandler}
          >
            {isFetching ? (
              <MultiDropdown.Option
                value={''}
                key="filters__ring-groups-loading"
              >
                <Loader inline tiny>
                  {t('ringGroupsDropdown.loading')}
                </Loader>
              </MultiDropdown.Option>
            ) : (
              renderRingGroupsOptions()
            )}
          </MultiDropdown>
        </DropdownWrapper>
      </Form.Field>
    </div>
  )
}

export default RingGroupFilter
