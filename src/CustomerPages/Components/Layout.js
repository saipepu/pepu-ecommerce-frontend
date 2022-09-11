import React from 'react'
import Header from './Header'
import styles from './style.module.scss'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <div className={styles.layoutContainer}>
      <Header />
      <div className={styles.bodyContainer}>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
