import { useState, useEffect, useReducer } from 'react'
import styled from 'styled-components'
import { NavHeader } from '@titanium/components'
import { useTranslation } from 'react-i18next'
import {
  Button,
  Grid,
  Icon,
  PanelsLayout
} from '@cobalt/cobalt-react-components'
import isEqual from 'lodash/isEqual'
import { defaultFilters } from 'activity-app/constants/filters.constants'
import { AGENT } from 'activity-app/constants/scope-types.constants'
import ActivityFilter from './activity-filter/ActivityFilter.component'
// import ContactFilter from './contact-filter/ContactFilter.component'
// import AgentFilter from './agent-filter/AgentFilter.component'
// import WhenFilter from './when-filter/WhenFilter.component'
// import RingGroupFilter from './ring-group-filter/RingGroupFilter.component'
import { ActivityFiltersActionTypes, ActivityFilters, SetActivityFilterAction } from 'types'
import { useCurrentUser } from 'titanium/common/context/user.context'
import { useNavigate } from 'react-router-dom'
import useCreateSearchParams from 'activity-app/hooks/use-create-search-params'
import useGetScopePermission from 'activity-app/hooks/use-get-scope-permission'
import { ROOT_URL } from 'activity-app/constants/url.constants'
import diffBetweenObjects from 'activity-app/utils/diff-between-objects'
import useGetCurrentFilters from 'activity-app/hooks/use-get-current-filters'
import ContactFilter from './contact-filter/ContactFilter.component'
import AgentFilter from './agent-filter/AgentFilter.component'
import WhenFilter from './when-filter/WhenFilter.component'
import RingGroupFilter from './ring-group-filter/RingGroupFilter.component'


// FilterGroup.propTypes = {
//   activeFilters: object.isRequired,
//   currentUser: object.isRequired,
//   onAgentFilterInit: func.isRequired,
//   onApplyClick: func.isRequired,
//   onClearClick: func.isRequired,
//   onUserSearch: func.isRequired,
//   onRingGroupsFilterInit: func.isRequired,
//   onRingGroupsSearch: func.isRequired,
//   ringGroups: arrayOf(RingGroupPropType).isRequired,
//   totalRingGroups: number.isRequired,
//   scope: oneOf([AGENT, ALL, RING_GROUP]).isRequired,
//   users: arrayOf(UserPropType).isRequired,
//   totalUsers: number.isRequired,
// }



const Title = styled.h2`
  outline: 0;
`

const filterReducer = (state: ActivityFilters, action: SetActivityFilterAction) => {
  switch (action.type) {
    case ActivityFiltersActionTypes.SET_ACTIVITY_TYPE:
    case ActivityFiltersActionTypes.RESET_FILTERS:
    case ActivityFiltersActionTypes.SET_AGENT:
    case ActivityFiltersActionTypes.SET_CONTACT:
    case ActivityFiltersActionTypes.SET_WHEN:
    case ActivityFiltersActionTypes.SET_RING_GROUP: {
      return { ...state, ...action.payload }
    }
    default:
      return state
  }
}

const FilterGroup = () => {
  const [t] = useTranslation()
  const currentUser = useCurrentUser()
  const navigate = useNavigate()
  const { createUrl, createUrlFromRoot } = useCreateSearchParams()
  const scope = useGetScopePermission()
  const currentFilters = useGetCurrentFilters()
  const [filters, setFilters] = useReducer(filterReducer, currentFilters)
  // useEffect(() => setSelectedFilters(activeFilters), [activeFilters])

  const onApplyClickHandler = () => {
    // if (isEqual(filters, defaultFilters)) {
    //   navigate(ROOT_URL)
    // } else {
    //   //apply filters different than default to the url
    //   //close the filters sidepanel
    //   const teste = diffBetweenObjects(defaultFilters, filters)
    //   console.log('onApplyClickHandler - teste->', teste)
    //   navigate(createUrl({
    //     ...teste,
    //     filtersVisible: undefined
    //   }))
    // }

    //apply filters different than default to the url
    //close the filters sidepanel
    const teste = diffBetweenObjects(defaultFilters, filters)
    console.log('onApplyClickHandler - teste->', teste)
    navigate(createUrlFromRoot({
      ...teste,
      filtersVisible: undefined
    }))
  }
  const onClearClickHandler = () => {
    // if (!isEqual(activeFilters, defaultFilters)) {
    //   onClearClick()
    // }
    // setFilters({ type: ActivityFiltersActionTypes.RESET_FILTERS, payload: defaultFilters })
    setFilters({ type: ActivityFiltersActionTypes.RESET_FILTERS, payload: defaultFilters })
    // navigate(ROOT_URL)
    navigate(createUrlFromRoot({
      filtersVisible: true
    }))
  }

  const isAgentScope = scope === AGENT

  const onCloseFilters = () => {
    navigate(createUrl({
      filtersVisible: undefined
    }))
  }
  console.log('FilterGroup - currentFilters ->', filters)
  return (
    <>
      <NavHeader
        borderless
        title={<Title tabIndex="0">{t('filters.title')}</Title>}
        onClose={onCloseFilters}
      />
      <PanelsLayout.Content>
        <Grid fullWidth>
          <Grid.Group>
            <Grid.Column>
              <Grid noPadding>
                <Grid.Group gutters={Grid.Group.HALF_GUTTERS}>
                  <Grid.Column>
                    <ActivityFilter
                      value={filters.type}
                      onChange={value =>
                        setFilters({
                          type: ActivityFiltersActionTypes.SET_ACTIVITY_TYPE,
                          payload: { type: value }
                        })
                      }
                    />
                  </Grid.Column>
                </Grid.Group>
                <Grid.Group gutters={Grid.Group.HALF_GUTTERS}>
                  <Grid.Column>
                    <ContactFilter
                      onChange={(value) => {
                        setFilters({
                          type: ActivityFiltersActionTypes.SET_CONTACT,
                          payload: { contact: value }
                        })
                      }}
                      value={filters.contact.id}
                    />
                  </Grid.Column>
                </Grid.Group>
                {!isAgentScope && (
                  <Grid.Group gutters={Grid.Group.HALF_GUTTERS}>
                    <Grid.Column>
                      <AgentFilter
                        value={filters.agent}
                        onChange={value =>
                          setFilters({
                            type: ActivityFiltersActionTypes.SET_AGENT,
                            payload: { agent: value }
                          })
                        }
                      />
                    </Grid.Column>
                  </Grid.Group>
                )}
                <Grid.Group gutters={Grid.Group.HALF_GUTTERS}>
                  <Grid.Column>
                    <WhenFilter
                      value={filters.when}
                      onChange={value =>
                        setFilters({
                          type: ActivityFiltersActionTypes.SET_WHEN,
                          payload: { when: value }
                        })
                      }
                    />
                  </Grid.Column>
                </Grid.Group>
                <Grid.Group gutters={Grid.Group.HALF_GUTTERS}>
                  <Grid.Column>
                    <RingGroupFilter
                      value={filters.ringGroups}
                      onChange={value =>
                        setFilters({
                          type: ActivityFiltersActionTypes.SET_RING_GROUP,
                          payload: { ringGroups: value }
                        })
                      }
                    />
                  </Grid.Column>
                </Grid.Group>
              </Grid>
            </Grid.Column>
          </Grid.Group>
        </Grid>
      </PanelsLayout.Content>
      <Grid>
        <Grid.Group gutters={Grid.Group.GUTTERS}>
          <Grid.Column pushRight>
            <Button secondary onClick={onClearClickHandler}>
              <span data-testid="filters__clear-button">
                {t('actions.clearFilters')}
              </span>
            </Button>
            <Button primary onClick={onApplyClickHandler}>
              <Icon name={Icon.CHECK} />
              <span data-testid="filters__apply-button">
                {t('actions.applyFilters')}
              </span>
            </Button>
          </Grid.Column>
        </Grid.Group>
      </Grid>
    </>
  )
}

export default FilterGroup
