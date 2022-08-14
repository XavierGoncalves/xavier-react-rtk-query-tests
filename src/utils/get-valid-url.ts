const getValidUrl = (url: string) =>
    url.startsWith('http://') || url.startsWith('https://')
        ? url
        : `http://${url}`

export default getValidUrl
