import React from 'react'
import classNames from 'classnames'
import { Icon } from '@cobalt/cobalt-react-components'
import { LinkWrapper, RouterLinkWrapper } from './link-wrapper.component'
import { compareComponents } from '../helpers/compare-components'
import { getNativeProps } from '../helpers/get-native-props'

const LinkButton = ({
  asButton = false,
  children,
  danger = false,
  disabled = false,
  href,
  inverted = false,
  primary = false,
  secondary = false,
  small = false,
  success = false,
  tabIndex,
  target,
  to,
  onClick = () => {},
  ...props
}) => {
  const isIcon = child => compareComponents(child.type, Icon)
  const isPlainText = child => typeof child === 'string'

  const filteredChildren = React.Children.toArray(children).filter(
    child => child !== null
  )

  const hasOnlyIcon = filteredChildren.every(isIcon)

  const classes = classNames({
    'co-link': !asButton,
    'co-button': asButton,
    'co-button--icon': hasOnlyIcon,
    'co--primary': primary,
    'co--danger': danger,
    'co--invert': inverted,
    'co--secondary': secondary,
    'co--success': success,
    'co--disabled': disabled,
    'co--small': small,
    'ti-link-button': true,
    'ti-link-button--default': !primary && !danger && !success
  })

  const linkProps = {
    className: classes,
    href,
    tabIndex,
    target,
    to,
    onClick,
    ...getNativeProps(props)
  }

  const linkContent = filteredChildren.map((child, index) =>
    isPlainText(child) ? <span key={index}>{child}</span> : child
  )

  return to ? (
    <RouterLinkWrapper {...linkProps}>{linkContent}</RouterLinkWrapper>
  ) : (
    <LinkWrapper {...linkProps}>{linkContent}</LinkWrapper>
  )
}

export default LinkButton
