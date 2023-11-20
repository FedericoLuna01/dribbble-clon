import getCurrentUser from '@/actions/get-current-user'
import RegisterForm from './components/register-form'
import { redirect } from 'next/navigation'

const SignInPage = async () => {
  const user = await getCurrentUser()

  if (user) { redirect('/') }

  return (
    <RegisterForm />
  )
}

export default SignInPage