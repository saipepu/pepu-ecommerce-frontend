import React, { useEffect } from 'react';
import { InputWrapper, Input, Button, Group, Text, MantineProvider, Loader} from '@mantine/core'
import styles from './signinsignup.module.scss'
import { useForm } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../redux/user/Action';
import { isAuth } from './controller';

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.signUpReducer);
  const { userData, isLoading, error } = user;

  const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const form =useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      termsOfService: false
    },
    validate: {
      email: (value) => (emailRegExp.test(value) ? null : 'Invalid Email'),
    }
  })

  const handleSignUp = async (values) => {
    dispatch(signup(values));
  }
  useEffect(() => {
    console.log(userData);
    if(userData?.signupSuccess || isAuth()){
      console.log('redirecting...')
      navigate('/admin/dashboard')
    }
  }, [isLoading])

  return (
    <>
    <MantineProvider
      styles={{ 
        Group: { root: { width: '100%', flexWrap: 'nowrap', justifyContent: 'space-between'}}
      }}
    >
      <div className={styles.container}>
        <form className={styles.form} onSubmit={form.onSubmit((values) => handleSignUp(values))}>
          <div className={styles.logo}>
            OLIVIA
          </div>
          <InputWrapper
            className={styles.input_wrapper}
            id="input-wrapper"
            required
            label="Name"
          >
            <Input id="name" placeholder="Your Name" {...form.getInputProps('name')} />
          </InputWrapper>
          <InputWrapper
            className={styles.input_wrapper}
            id="input-wrapper"
            required
            label="Email"
          >
            <Input id="name" placeholder="your@email.com" type="email" {...form.getInputProps('email')} />
          </InputWrapper>
          <InputWrapper
            className={styles.input_wrapper}
            id="input-wrapper"
            required
            label="Password"
          >
            <Input id="name" placeholder="password" type="password" {...form.getInputProps('password')} />
          </InputWrapper>
          <Group position="right">
            <Text>Already have an account?<Text variant="link" component="a" onClick={() => navigate('/admin/signin')}> SignIn</Text></Text>
            <Button type="submit">SignUp</Button>
          </Group>
          {isLoading ? (
            <div style={{ width: '100vw', height: '100vh', display: 'grid', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', backgroundColor: 'rgba(0,0,0,0.5)'}}>
              <Loader variant="bars" style={{ margin: 'auto' }} color="pink" size="100" />
            </div>
          ) : ''}
            
        </form>
      </div>
    </MantineProvider>
    </>
  )
}
export default SignUpPage;