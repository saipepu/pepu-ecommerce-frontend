import React from 'react'
import styles from './style.module.scss'
import { Button } from '@mantine/core'

const PromotionBanner = ({title, subtitle, cta}) => {
  return (
    <div className={styles.promotionBannerContainer}>
      <div className={styles.subtitle}>{subtitle}</div>
      <div className={styles.title}>{title}</div>
      <Button color="orange" sx={{ borderRadius: '100px', fontSize: '24px', padding: '15px 30px 15px 30px', height: 'fit-content' }}>
        {cta}
      </Button>
    </div>
  )
}

export default PromotionBanner
