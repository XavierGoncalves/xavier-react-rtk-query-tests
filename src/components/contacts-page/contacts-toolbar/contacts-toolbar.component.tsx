import { useState } from "react"
import { useTranslation } from "react-i18next"
import {
    Toolbar,
    Grid,
    Paragraph,
    LoadingPlaceholder,
    Color,
    Viewport,
    Button,
    Icon
} from '@cobalt/cobalt-react-components'
import styled from 'styled-components'
import { SearchInput } from "./search-input/search-input.component"
import { OrderByButton } from "./order-by-button/order-by-button.component"
import { SortType } from "types"

const SearchWrapper = styled.div`
  width: ${props => (props.small ? '100%' : '21.5rem')};
  .co-search input[type='search'][value] + .co--dismiss {
    display: none;
  }
`

interface Props {
    total: number;
    loading: boolean,
    sort: SortType,
    search: string,
    onSortBy: (field: string, direction: string) => {},
    onSearchContact: (query: string) => {}
}

const ContactsToolbar = ({
    total,
    loading,
    sort,
    search,
    onSortBy,
    onSearchContact
}: Props) => {
    const [t] = useTranslation()
    const [isSearchToolbarOpen, setSearchToolbarOpen] = useState(false)
    return (
        <>
            <Toolbar>
                <Grid.Group
                    horizontalGutters={Grid.Group.HALF_HORIZONTAL_GUTTERS}
                    backgroundColor={Color.background.gray[100]}
                >
                    <Grid.Column pushVcenter>
                        {loading ? (
                            <LoadingPlaceholder tiny />
                        ) : (
                            <Paragraph>
                                {t('pages.index.toolbar.counter', { count: total })}
                            </Paragraph>
                        )}
                    </Grid.Column>
                    <Grid.Column all="min" pushVcenter>
                        <Viewport large medium>
                            <SearchWrapper>
                                <SearchInput
                                    data-testid="search-input"
                                    value={search}
                                    onSearch={onSearchContact}
                                    placeholder={t('pages.index.toolbar.searchPlaceholder')}
                                    small
                                />
                            </SearchWrapper>
                        </Viewport>
                        <Viewport small>
                            <Button
                                small
                                data-testid="toolbar__search-button"
                                onClick={() => setSearchToolbarOpen(!isSearchToolbarOpen)}
                            >
                                <Icon name={Icon.SEARCH} />
                            </Button>
                        </Viewport>
                        <Viewport small>
                            <OrderByButton sort={sort} onItemClick={onSortBy} />
                        </Viewport>
                    </Grid.Column>
                </Grid.Group>
            </Toolbar>
            <Viewport small>
                <>
                    {isSearchToolbarOpen ? (
                        <Toolbar data-testid="toolbar__search">
                            <SearchWrapper small>
                                <SearchInput
                                    data-testid="search-input__small"
                                    value={search}
                                    onSearch={onSearchContact}
                                    placeholder={t('pages.index.toolbar.searchPlaceholder')}
                                    autoFocus
                                    small
                                />
                            </SearchWrapper>
                        </Toolbar>
                    ) : null}
                </>
            </Viewport>
        </>
    )
}

export default ContactsToolbar
