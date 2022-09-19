import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { updateProfile, onAuthStateChanged } from 'firebase/auth'
import { useUser } from '../hooks/useAuth'
import { storage, auth } from '../firebase'
import Header from '../parts/Header'

const Profile = () => {
  const [name, setName] = useState('')
  const [image, setImage] = useState<File | null>()
  const [imageSrc, setImageSrc] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const { user } = useUser()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setImage(e.target.files[0])
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (image) {
        const imageRef = ref(storage, 'images/' + image.name)
        uploadBytes(imageRef, image).then(() => {
          getDownloadURL(imageRef).then((url) => {
            if (user) {
              updateProfile(user, {
                displayName: name,
                photoURL: url,
              })
            }
            navigate('/')
          })
        })
      } else {
        if (user) {
          updateProfile(user, {
            displayName: name,
          })
        }
        navigate('/')
      }
    } catch (err) {
      setError(true)
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setName(user?.displayName ?? '')
      setImageSrc(user?.photoURL ?? '')
    })
  }, [])

  return (
    <>
      <Header />
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          プロフィール設定
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            type="text"
            required
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="表示名"
            sx={{ mt: 1, mb: 1 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Avatar
              src={image ? URL.createObjectURL(image) : imageSrc}
              alt=""
            />
            <Box>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
                style={{ display: 'none' }}
              />
              <InputLabel htmlFor="image">
                <Button variant="contained" color="primary" component="span">
                  画像を選択
                </Button>
              </InputLabel>
            </Box>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            保存
          </Button>
        </Box>
        {error && <Alert severity="error">保存できませんでした</Alert>}
      </Box>
    </>
  )
}

export default Profile
