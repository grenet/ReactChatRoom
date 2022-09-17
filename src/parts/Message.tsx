import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

interface Props {
  icon: string
  userName: string
  text: string
}
const Message = (props: Props) => {
  const { icon, userName, text } = props

  return (
    <Box sx={{ mt: 1, mb: 1 }}>
      <Paper elevation={3}>
        <Stack direction="row" spacing={2}>
          <Avatar sx={{ mt: 2, mb: 2, ml: 2 }} src={icon} />
          <Box>
            <Typography sx={{ mt: 1, mb: 1 }} variant="subtitle2">
              {userName}
            </Typography>
            <Typography sx={{ mt: 1, mb: 1, mr: 1 }} variant="body2">
              {text}
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Box>
  )
}

export default Message
