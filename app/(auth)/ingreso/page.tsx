import getCurrentUser from '@/actions/get-current-user'
import LoginForm from './components/login-form'
import { redirect } from 'next/navigation'

const LogInPage = async () => {
  const user = await getCurrentUser()

  if (user) { redirect('/') }

  return (
    <LoginForm />
  )
}

export default LogInPage