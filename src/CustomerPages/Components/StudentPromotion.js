import React from 'react'
import styles from './style.module.scss'
import image from '../../assets/images/student_promotion_banner.png'

const StudentPromotion = ({title, subtitle, cta}) => {
  return (
    <div className={styles.studentPromotionBanner}>
      <div className={styles.imgContainer}>
        <img src={image} alt="promotion banner"/>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.title}>
          {title}
        </div>
        <div className={styles.subtitle}>
          {subtitle}
        </div>
        <div className={styles.cta_btn}>
          {cta}
        </div>
      </div>
    </div>
  )
}

export default StudentPromotion
