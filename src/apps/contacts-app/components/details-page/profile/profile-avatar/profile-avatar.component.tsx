import { Avatar, Icon } from '@cobalt/cobalt-react-components'
import { useTheme } from '@cobalt/react-theme-provider'

interface Props {
  initials?: string
}

const ProfileAvatar = ({ initials }: Props) => {
  const theme = useTheme()

  return (
    <Avatar
      backgroundColor={theme.primary300}
      contentColor={theme.primary600}
      large
    >
      {initials || <Icon large name={Icon.USER} />}
    </Avatar>
  )

}
export default ProfileAvatar
