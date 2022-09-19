import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from '../firebase'

export const useSignup = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const signup = (email: string, password: string) => {
    setError(null)
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/profile')
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  return { signup, error }
}

export const useLogin = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const login = (email: string, password: string) => {
    setError(null)
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/')
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  return { login, error }
}

export const useLogout = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const logout = () => {
    setError(null)
    signOut(auth)
      .then(() => {
        navigate('/login')
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  return { logout, error }
}

export const useUser = () => {
  const user = auth.currentUser
  return { user }
}
