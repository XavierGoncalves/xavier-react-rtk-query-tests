import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Form, MultiDropdown, Paragraph } from '@cobalt/cobalt-react-components'
import Flex from '@cobalt/react-flex'
import Spinner from '@cobalt/react-spinner'
import { Text } from '@cobalt/react-typography'
import styled from 'styled-components'
import { RingGroupPropType } from '../../../../types/ringGroup'

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
      return isLoading ? hideCheckbox + hideSelectAll : hideCheckbox
    }
  }}

  .co-loader {
    margin: auto;
  }
`

export const RingGroupFilter = ({
  ringGroups = [],
  selectedRingGroups = [],
  totalRingGroups,
  onChange,
  onRingGroupsFilterInit,
  onRingGroupsSearch
}) => {
  const [t] = useTranslation()
  const [loading, setLoading] = useState(true)
  const [noResultsMessage, setNoResultsMessage] = useState(null)
  const [isQueryTooShort, setIsQueryTooShort] = useState(false)
  const [ringGroupsOptions, setRingGroupsOptions] = useState(ringGroups)
  const [query, setQuery] = useState(null)

  const remainingValue = totalRingGroups - ringGroupsOptions.length
  const remainingRingGroups = remainingValue > 0 ? remainingValue : null

  useEffect(() => {
    onRingGroupsFilterInit()
  }, [])

  useEffect(() => {
    setLoading(false)

    if (!ringGroups.length) {
      setRingGroupsOptions([])
      setNoResultsMessage(t('fields.ringGroups.empty'))
    } else {
      const ringGroupsNames = ringGroups.map(ringGroup => ringGroup.name)
      const missingOptions = selectedRingGroups
        .filter(name => !ringGroupsNames.includes(name))
        .map(name => ({ name }))

      setRingGroupsOptions([...ringGroups, ...missingOptions])
    }
  }, [ringGroups])

  const onSearchRingGroupsHandler = query => {
    const isQueryTooShort = query.length > 0 && query.length < 3
    setIsQueryTooShort(isQueryTooShort)
    setQuery(query)

    if (isQueryTooShort) {
      setNoResultsMessage(t('fields.ringGroups.typeMore'))
    } else {
      setLoading(true)
      onRingGroupsSearch(query)
    }
  }

  const onChangeHandler = e => {
    const selected = e.target.value ? e.target.value.split(',') : []

    onChange(selected.length === selectedRingGroups.length ? [] : selected)
  }

  const onFocusHandler = () => {
    if (query) {
      setQuery(null)
      setLoading(true)
      onRingGroupsFilterInit()
    }
  }

  const renderRingGroupsOptions = () => {
    const options = ringGroupsOptions.map(ringGroup => (
      <MultiDropdown.Option
        key={ringGroup.name}
        value={ringGroup.name}
        selected={selectedRingGroups.includes(ringGroup.name)}
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
          {t('fields.ringGroups.refineSearch', {
            remainingRingGroups
          })}
        </Paragraph>
      </MultiDropdown.Option>
    ) : null

    return options.length && !isQueryTooShort
      ? [...options, remainingOption]
      : []
  }

  return (
    <div className="ring-groups-filter">
      <Form.Field label={t('fields.ringGroups.label')} id="ring-groups-filter">
        <DropdownWrapper
          remainingRingGroups={remainingRingGroups}
          isLoading={loading}
        >
          <MultiDropdown
            id="filters__ring-groups-dropdown"
            searchable
            items={ringGroups}
            onChange={onChangeHandler}
            placeholder={t('fields.ringGroups.placeholder')}
            selectAllLabel={t('fields.ringGroups.selectAll')}
            searchPlaceholder={t('fields.ringGroups.searchPlaceholder')}
            onSearch={onSearchRingGroupsHandler}
            noResultsMessage={noResultsMessage}
            onFocus={onFocusHandler}
          >
            {loading ? (
              <MultiDropdown.Option
                value={''}
                key="filters__ring-groups-loading"
              >
                <Flex gap="2" alignX="center">
                  <Spinner />
                  <Text inline>{t('fields.ringGroups.loading')}</Text>
                </Flex>
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

RingGroupFilter.propTypes = {
  ringGroups: PropTypes.arrayOf(RingGroupPropType),
  selectedRingGroups: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  onRingGroupsFilterInit: PropTypes.func.isRequired,
  onRingGroupsSearch: PropTypes.func.isRequired,
  totalRingGroups: PropTypes.number.isRequired
}
