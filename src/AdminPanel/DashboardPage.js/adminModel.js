import React, { useEffect, useState } from 'react';
import { isAuth } from '../SigninPages/controller';
import { useNavigate } from 'react-router-dom';
import { AppShell, Burger, MediaQuery, Text, Aside, Footer, useMantineTheme, Box } from '@mantine/core';
import Navbar from '../Components/navbar';
import Header from '../Components/header'
import { useMediaQuery } from '@mantine/hooks';

const AdminModel = ({children}) => {
  const matchBreakPoint = useMediaQuery('(min-width: 800px')
  const theme = {
    breakpoints: {
      xs: 380,
      sm: 448,
      md: 800,
      lg: 1200,
      xl: 1440,
    }
  }
  const navigate = useNavigate();
  const [opened, setOpened] = useState(true);

  useEffect(() => {
    console.log(isAuth());
    if(!isAuth()){
      navigate('/admin/signin')
    }
  },[])
  
  return (
    <>
    <AppShell
      theme={theme}
      navbarOffsetBreakpoint="md"
      fixed
      navbar={<Navbar opened={opened} setOpened={setOpened} />}
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={<Header opened={opened} setOpened={setOpened} />}
    >
      <Box style={ opened && !matchBreakPoint ? { paddingLeft: '180px'} : { paddingLeft: 0 }}>
        {children}
      </Box>
    </AppShell>
    </>
  )
}
export default AdminModel;