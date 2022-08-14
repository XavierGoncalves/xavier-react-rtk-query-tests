import Box from '@cobalt/react-box'
import Button, { LinkButton } from '@cobalt/react-button'
import Divider from '@cobalt/react-divider'
import Flex from '@cobalt/react-flex'
import Grid, { Column } from '@cobalt/react-grid'
import Icon from '@cobalt/react-icon'
import { Text } from '@cobalt/react-typography'
import { useViewport } from '@cobalt/react-viewport-provider'
import { useTheme } from '@cobalt/react-theme-provider'
import JumpToPage from './jump-to-page/jump-to-page.component'
import { pagesGenerator } from './utils/pagination-utils'

type CustomLabels = {
  [key:string]: string
}
interface Props {
  totalPages: number;
  maxPagesCount: number;
  currentPage: number;
  onPageClick: (page: number) => void;
  onPageChange: (page: number) => void;
  customLabels: CustomLabels;
  onPageMouseEnter: (page: number) => void;
}


export const PaginationToolbar = ({
  totalPages,
  maxPagesCount,
  currentPage,
  onPageClick,
  onPageChange,
  customLabels = {
    paginationPrevious: 'Previous',
    paginationNext: 'Next',
    jumpTo: 'Jump to:'
  },
  onPageMouseEnter
}: Props) => {
  const theme = useTheme()
  const viewport = useViewport()
  const smallViewport = viewport === 'small'

  const onNextPageClick = () => onPageClick(currentPage + 1)
  const onPreviousPageClick = () => onPageClick(currentPage - 1)

  const pages = pagesGenerator(totalPages, currentPage, maxPagesCount)

  const isPreviousDisabled = currentPage === 1
  const isNextDisabled = currentPage === totalPages

  return (
    <>
      <Divider />
      <Flex
        alignY="center"
        paddingX={5}
        height="3.25rem"
        backgroundColor={theme.gray100}
      >
        <Grid columns="10" width="100%">
          <Column length="8">
            <Flex
              gap="1"
              alignY="center"
              data-testid="ti-pagination-toolbar__pagination"

            >
              <LinkButton
                type="secondary"
                size="small"
                tabIndex={0}
                onClick={!isPreviousDisabled ? onPreviousPageClick : () => {}}
                disabled={isPreviousDisabled}
              >
                <Icon name="chevron_left" size="tiny" />
                {!smallViewport && (
                  <Text inline>{customLabels.paginationPrevious}</Text>
                )}
              </LinkButton>

              {!smallViewport && renderPages(pages, currentPage, onPageClick, theme, onPageMouseEnter)}

              <LinkButton
                type="secondary"
                size="small"
                tabIndex={0}
                onClick={!isNextDisabled ? onNextPageClick : () => {}}
                disabled={isNextDisabled}
              >
                {!smallViewport && (
                  <Text inline>{customLabels.paginationNext}</Text>
                )}
                <Icon name="chevron_right" size="tiny" />
              </LinkButton>
            </Flex>
          </Column>
          <Column length="2">
            <Flex alignX="end" alignY="center" height="100%">
              <JumpToPage
                id={'jump-to-page'}
                value={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                jumpToLabel={customLabels.jumpTo}
              />
            </Flex>
          </Column>
        </Grid>
      </Flex>
      <Divider />
    </>
  )
}

const renderPages = (pages, currentPage, onClick, theme, onPageMouseEnter) => {
  console.log('renderPages-', pages)
  return pages.map((page, index) => {
    const isPageNumber = Number.isInteger(page)
    const selected = currentPage === page

    if (selected) {
      return (
        <Button
          key={index}
          shape="compact"
          type="primary"
          size="small"
          className="active"
        >
          {page}
        </Button>
      )
    }

    return isPageNumber ? (
      <LinkButton
        key={index}
        shape="compact"
        type="secondary"
        size="small"
        tabIndex={0}
        onClick={() => onClick(page)}
        onMouseEnter={() => onPageMouseEnter(page)}
      >
        <Text>{page}</Text>
      </LinkButton>
    ) : (
      <Box paddingX="2" key={index}>
        <Text inline color={theme.gray500}>
          {page}
        </Text>
      </Box>
    )
  })
}

export default PaginationToolbar
