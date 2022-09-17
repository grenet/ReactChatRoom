import { useState } from 'react'
import Alert from '@mui/material/Alert'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'
import Stack from '@mui/material/Stack'

import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { useUser } from '../hooks/useAuth'

const InputBox = () => {
  const [error, setError] = useState(false)
  const [text, setText] = useState('')
  const { user } = useUser()
  const messageRef = collection(db, 'chatrooms', 'room1', 'messages')

  const add = async () => {
    setError(false)
    try {
      await addDoc(messageRef, {
        icon: user?.photoURL,
        userName: user?.displayName,
        text,
        timestamp: serverTimestamp(),
      })
    } catch (err) {
      setError(true)
    } finally {
      setText('')
    }
  }

  return (
    <Stack direction="row" spacing={1} sx={{ mt: 2, ml: 2 }}>
      <TextField
        placeholder="メッセージ入力"
        multiline
        maxRows={4}
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <IconButton
        onClick={() => {
          add()
        }}
        color="primary"
        disabled={text == ''}
      >
        <SendIcon />
      </IconButton>
      {error && <Alert severity="error">送信できませんでした</Alert>}
    </Stack>
  )
}

export default InputBox
