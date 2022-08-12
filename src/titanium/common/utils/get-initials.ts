export const getInitials = name => {
    if (!name) {
        return ''
    }

    const words = name
        .split(' ')
        .reduce(
            (acc, word) => (startsWithLetter(word) ? [...acc, word.charAt(0)] : acc),
            []
        )

    const first = words.shift() || ''
    const last = words.pop() || ''

    return `${first}${last}`.toUpperCase()
}

const isLetter = input => input.toLowerCase() !== input.toUpperCase()

const startsWithLetter = word => word.length && isLetter(word.charAt(0))
