const allowedProps = [
  'data-',
  'onMouseEnter',
  'onMouseLeave',
  'forwardRef',
  'aria-',
  'role'
]
const allowedKey = key =>
  allowedProps.reduce((allowed, prop) => allowed || key.startsWith(prop), false)

export const getNativeProps = props =>
  Object.keys(props)
    .filter(key => allowedKey(key))
    .reduce((obj, key) => {
      const prop = key === 'forwardRef' ? 'ref' : key
      return { ...obj, [prop]: props[key] }
    }, {})
