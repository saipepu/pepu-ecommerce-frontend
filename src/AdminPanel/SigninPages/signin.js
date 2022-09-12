import React, { useEffect } from 'react';
import { InputWrapper, Input, Button, Group, Text, MantineProvider, Loader, Notification} from '@mantine/core'
import styles from './signinsignup.module.scss'
import { useForm } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../redux/user/Action';
import { isAuth } from './controller';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userSignUp = useSelector((state) => state.signUpReducer);
  const userSignIn = useSelector((state) => state.signInReducer);
  const { userData, isLoading, error } = userSignIn;
  if(error) {
    toast.error('error')
  }

  useEffect(() => {
    if(isAuth()) {
      navigate('/admin/dashboard')
    } else {
      localStorage.setItem('usertoken', JSON.stringify(userData));
    }
  }, [userData])

  useEffect(() => {
    if(userData?.signinSuccess){
      console.log('redirecting...')
      navigate('/admin/dashboard')
    }
  }, [isLoading])

  const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const form =useForm({
    initialValues: {
      email: '',
      password: '',
      termsOfService: false
    },
    validate: {
      email: (value) => (emailRegExp.test(value) ? null : 'Invalid Email'),
    }
  })

  const handleSignIn = async (values) => {
    dispatch(signin(values));
  }

  return (
    <>
     <MantineProvider
      styles={{ 
        Group: { root: { width: '100%', flexWrap: 'nowrap', justifyContent: 'space-between'}}
      }}
    >
      <div className={styles.container}>
        <form className={styles.form} onSubmit={form.onSubmit((values) => handleSignIn(values))}>
          <div className={styles.logo}>
            OLIVIA
          </div>
          <InputWrapper
            className={styles.input_wrapper}
            id="input-wrapper"
            required
            label="Email"
          >
            <Input id="Email" placeholder="your@email.com" type="email" {...form.getInputProps('email')} />
          </InputWrapper>
          <InputWrapper
            className={styles.input_wrapper}
            id="input-wrapper"
            required
            label="Password"
          >
            <Input id="Password" placeholder="password" type="password" {...form.getInputProps('password')} />
          </InputWrapper>
          <Group position="right">
            <Text>Don't have an account?<Text variant="link" component="a" onClick={() => navigate('/')}>SignUp</Text></Text>
            <Button type="submit">SignUp</Button>
          </Group>
          {isLoading ? (
            <div style={{ width: '100vw', height: '100vh', display: 'grid', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', backgroundColor: 'rgba(0,0,0,0.5)'}}>
              <Loader variant="bars" style={{ margin: 'auto' }} color="pink" size="100" />
            </div>
          ) : ''}
          {error && <ToastContainer/>}
        </form>
      </div>

    </MantineProvider>
    </>
  )
}
export default SignInPage;