const getDescription = (title?: string, company?: string): string | null =>
    title && company
        ? 'pages.details.description.titleAndCompany'
        : title
            ? 'pages.details.description.onlyTitle'
            : company
                ? 'pages.details.description.onlyCompany'
                : null

export default getDescription
