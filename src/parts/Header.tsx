import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import { useLogout } from '../hooks/useAuth'

const Header = () => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [imageSrc, setImageSrc] = useState('')
  const { logout } = useLogout()

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setImageSrc(user?.photoURL ?? '')
    })
  }, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ChatRoom
          </Typography>
          <Avatar
            sx={{ mt: 2, mb: 2, ml: 2 }}
            src={imageSrc}
            onClick={handleMenu}
          />
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => navigate('/profile')}>
              プロフィール
            </MenuItem>
            <MenuItem onClick={() => logout()}>ログアウト</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
