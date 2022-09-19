import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'

import { useUser } from '../hooks/useAuth'
import Header from '../parts/Header'
import MessageList from '../parts/MessageList'
import InputBox from '../parts/InputBox'
import Copyright from '../parts/Copyright'

const Home = () => {
  const navigate = useNavigate()
  const { user } = useUser()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [])

  return (
    <>
      <Header />
      <Box>
        <MessageList />
        <InputBox />
      </Box>
      <Copyright />
    </>
  )
}

export default Home
