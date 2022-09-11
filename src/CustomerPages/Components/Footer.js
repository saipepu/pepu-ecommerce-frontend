import { Button, Input, InputWrapper } from '@mantine/core'
import React from 'react'
import styles from './style.module.scss'

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.info}>
        <div className={styles.label}>
          Info
        </div>
        <ul>
          <li>Where are we?</li>
          <li>How to colaborate?</li>
          <li>Achievement</li>
        </ul>
      </div>
      <div className={styles.about_us}>
        <div className={styles.label}>
          About Us
        </div>
        <ul>
          <li>Who we really are?</li>
          <li>What have we been doing?</li>
          <li>Why?</li>
        </ul>
      </div>
      <div className={styles.contact}>
      <InputWrapper
        id="input-demo"
        required
        label="Join Us"
        description="For more information about how we'll use your information, read our privacry policy"
        sx={{ label: {
          fontSize: '18px', fontFamily: 'sans-serif', fontWeight: 'bold', color: 'white'
        }, marginBottom: '10px'}}
      >
        <Input placeholder="Enter your email here" />
      </InputWrapper>
      <Button sx={{ backgroundColor: 'rgba(120,120,220,0.5)'}}>SEND</Button>
      </div>
    </div>
  )
}

export default Footer
