import { useState } from 'react'
import { Icon, Button, Popup, List } from '@cobalt/cobalt-react-components'
import { useTranslation } from 'react-i18next'
import { onSortFn, SortType } from 'types';

interface Props {
    sort: SortType | undefined;
    onItemClick: onSortFn
}

export const OrderByButton = ({ sort, onItemClick }: Props) => {
    const [t] = useTranslation()
    const [isOpen, setIsPopUpOpen] = useState(false)

    const ORDER_BY_VALUES = [
        {
            field: 'name',
            direction: 'asc',
            label: t('pages.index.toolbar.sort.name.asc')
        },
        {
            field: 'name',
            direction: 'desc',
            label: t('pages.index.toolbar.sort.name.desc')
        }
    ]

    const isItemActive = item =>
        item.field === sort?.field && item.direction === sort?.direction

    return (
        <Popup.Wrapper>
            <Popup
                open={isOpen}
                small
                target={
                    <Button small data-testid="toolbar__orderby-button">
                        <Icon name={Icon.FORMAT_LINE_SPACING} />
                    </Button>
                }
                onToggle={() => {
                    setIsPopUpOpen(!isOpen)
                }}
                position={Popup.POSITION_RIGHT_BOTTOM}
                fluid
            >
                <Popup.Content noPadding>
                    <List>
                        <List.Group title={t('pages.index.toolbar.sort.label')}>
                            {ORDER_BY_VALUES.map(item => (
                                <List.Item
                                    active={isItemActive(item)}
                                    key={t(item.label)}
                                    onClick={() => onItemClick(item.field, item.direction)}
                                >
                                    <List.Item.Content minimal>
                                        <Icon
                                            name={isItemActive(item) ? Icon.CHECK : Icon.EMPTY}
                                            tiny
                                        />
                                    </List.Item.Content>
                                    <List.Item.Content>{t(item.label)}</List.Item.Content>
                                </List.Item>
                            ))}
                        </List.Group>
                    </List>
                </Popup.Content>
            </Popup>
        </Popup.Wrapper>
    )
}
