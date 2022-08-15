import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
    Icon,
    List,
    Popup,
    Search,
    Paragraph
} from '@cobalt/cobalt-react-components'
import { useLocalStorage } from 'titanium/common/hooks/use-local-storage'

interface Props {
    value: string;
    onSearch: (search: string) => void;
    placeholder: string;
    triggerDelay?: number;
    small: boolean;
    "data-testid": string;
    autoFocus?: boolean
}


const TRUNCATED_LENGTH = 33

export const SearchInput = ({
    value,
    onSearch,
    placeholder,
    triggerDelay = 300,
    small,
    "data-testid": dataTestId,
    autoFocus= false
}: Props) => {
    const [t] = useTranslation()

    const [searches, setSearches] = useLocalStorage('recent-searches', [])
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [currentSearch, setCurrentSearch] = useState('')
    const timeoutRef  = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
            timeoutRef.current = null

            if (currentSearch && !searches.includes(currentSearch)) {
                setSearches([currentSearch, ...searches.slice(0, 2)])
            }
        }, 3000)
    }, [currentSearch, searches, setSearches])

    const onSearchHandler = query => {
        if ((query && query.trim().length >= 3) || !query) {
            setIsPopupOpen(false)
            onSearch(query)
            setCurrentSearch(query)
        }
    }

    return (
        <Popup.Wrapper fullWidth>
            <Popup
                open={isPopupOpen}
                target={
                    <Search
                        value={value || ''}
                        onSearch={onSearchHandler}
                        placeholder={placeholder}
                        triggerDelay={triggerDelay}
                        small={small}
                        data-testid={dataTestId}
                        autoFocus={autoFocus}
                    />
                }
                onToggle={() => {
                    setIsPopupOpen(!isPopupOpen)
                }}
            >
                <Popup.Content noPadding>
                    <List>
                        <List.Item>
                            <Paragraph microcopy>
                                {t('pages.index.toolbar.typeMore')}
                            </Paragraph>
                        </List.Item>
                        {searches.map((search, index) => (
                            <List.Item key={index} onClick={() => onSearch(search)}>
                                <List.Item.Content minimal>
                                    <Icon name={Icon.HISTORY} tiny />
                                </List.Item.Content>
                                <List.Item.Content truncated>
                                    <Paragraph truncated={search.length > TRUNCATED_LENGTH}>
                                        {search}
                                    </Paragraph>
                                </List.Item.Content>
                            </List.Item>
                        ))}
                    </List>
                </Popup.Content>
            </Popup>
        </Popup.Wrapper>
    )
}
