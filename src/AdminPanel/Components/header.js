import React from 'react';
import { Header, MediaQuery, Burger, Text, MantineProvider, Group, Avatar } from '@mantine/core';
import styles from './style.module.scss'

const AdminHeader = ({opened, setOpened}) => {

  const theme = {
    breakpoints: {
      xs: 380,
      sm: 448,
      md: 800,
      lg: 1200,
      xl: 1440,
    }
  }
  return(
    <>
    <MantineProvider theme={theme}>
        <Header height={70} p="md">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
            <Group style={{ gap: '10px', justifyContent: 'flex-start' }}>
              <MediaQuery largerThan="md" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                />
              </MediaQuery>
              <Text className={styles.logo}>OLIVIA</Text>
            </Group>
            <Avatar radius="xl" size="sm"/>
          </div>
        </Header>
    </MantineProvider>
    </>
  )
}
export default AdminHeader;