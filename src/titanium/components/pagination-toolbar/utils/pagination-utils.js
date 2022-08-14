export const pagesGenerator = (totalPages, currentPage, maxVisiblePages) => {
  const safeTotalPages = Math.max(totalPages, 1)
  const totalPageArr = Array.from(
    Array(safeTotalPages),
    (value, index) => ++index
  )
  const sliceIndex = Math.floor(maxVisiblePages / 2)
  const currentPageIndex = currentPage - 1

  const visiblePages = windowSlice(
    totalPageArr,
    currentPageIndex - sliceIndex,
    currentPageIndex + sliceIndex
  )

  return fixedEdgesArray(visiblePages, safeTotalPages)
}

const fixedEdgesArray = (array, fixedEnd) => {
  const result = [...array]
  const lastPosition = array.length - 1

  if (array[0] !== 1) {
    result[0] = 1
    result[1] = '…'
  }

  if (array[lastPosition] !== fixedEnd) {
    result[lastPosition] = fixedEnd
    result[array.length - 2] = '…'
  }

  return result
}

const windowSlice = (array, unsafeStart, unsafeEnd) => {
  const maxEnd = array.length - 1

  const suffix = unsafeStart < 0 ? Math.abs(unsafeStart) : 0
  const prefix = unsafeEnd > maxEnd ? Math.abs(maxEnd - unsafeEnd) : 0

  const safeStart = Math.max(0, unsafeStart - prefix)
  const safeEnd = Math.min(unsafeEnd + suffix, maxEnd)

  return array.slice(safeStart, safeEnd + 1)
}
