import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { useSignup } from '../hooks/useAuth'

const Signup = () => {
  const { signup, error } = useSignup()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    signup(email, password)
  }

  return (
    <Box
      sx={{
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        アカウント登録
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          type="email"
          required
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email Address"
          sx={{ mt: 1, mb: 1 }}
        />
        <TextField
          type="password"
          required
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          sx={{ mt: 1, mb: 1 }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          アカウント登録
        </Button>
        <Link href="login" variant="body2">
          登録済みの場合、ログインはこちら
        </Link>
        {error && (
          <Alert severity="error">アカウントの登録に失敗しました</Alert>
        )}
      </Box>
    </Box>
  )
}

export default Signup
