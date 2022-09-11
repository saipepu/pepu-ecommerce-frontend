import React, { useState } from 'react';
import { ActionIcon, Group, Navbar, Text, MantineProvider, Divider } from '@mantine/core';
import { Dashboard, ManualGearbox,Box, ListDetails, ListCheck, PlaylistX } from 'tabler-icons-react'
import styles from './style.module.scss'

const AdminNavbar = ({opened, setOpened}) => {

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
    <MantineProvider theme={theme} style={{ Group: { root: { justifyContent: 'flex-start' }}}}>
        <Navbar p="md" hiddenBreakpoint="md" hidden={!opened} width={{ sm: 180, md:200, lg: 300}} className={styles.navbar}>
          <Group className={styles.navbar_links} component="a" href="/admin/dashboard">
            <ActionIcon><Dashboard /></ActionIcon>
            <Text>Dashboard</Text>
          </Group>
          <Group className={styles.navbar_links} component="a" href="/admin/category">
            <ActionIcon><ManualGearbox /></ActionIcon>
            <Text>Category</Text>
          </Group>
          <Group className={styles.navbar_links} component="a" href="/admin/product">
            <ActionIcon><Box /></ActionIcon>
            <Text>Product</Text>
          </Group>
          
          <Divider my="sm" />
            <Group className={styles.navbar_links}>
              <ActionIcon><ListDetails /></ActionIcon>
              <Text>Order</Text>
            </Group>
            <Group className={styles.navbar_links}>
              <ActionIcon><ListCheck /></ActionIcon>
              <Text>Shipped</Text>
            </Group>
            <Group className={styles.navbar_links}>
              <ActionIcon><PlaylistX /></ActionIcon>
              <Text>Cancel</Text>
            </Group>
        </Navbar>
    </MantineProvider>
    </>
  )
}
export default AdminNavbar;