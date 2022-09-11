import React, { useEffect } from 'react'
import Layout from '../Components/Layout'
import styles from './style.module.scss'
import { Button, Text } from '@mantine/core'
import ProductCarousel from '../Components/ProductCarousel'
import PromotionBanner from '../Components/PromotionBanner'
import StudentPromotion from '../Components/StudentPromotion'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct } from '../../redux/product/action'

const LandingPage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer)
  console.log(products)

  useEffect(() => {
    dispatch(fetchProduct())
  }, [])


  return (
      <Layout>
        <div className={styles.heroContainer}>
          <div className={styles.heroText}>
            <Text className={styles.subHeader}>24 Hours<br/>To Grab Anything You Want at Half-Price</Text>
            <Text className={styles.header}>
              Up to 50% Sale
            </Text>
            <Button color="orange" sx={{ borderRadius: '100px', fontSize: '24px', padding: '15px 30px 15px 30px', height: 'fit-content' }}>
              SHOP NOW
            </Button>
          </div>
        </div>
        <div className={styles.favSaleContainer}>
          <ProductCarousel title={'Sale Favorites'} type="sale_favourite"/>
        </div>
        <div className={styles.promotionBanner}>
          <PromotionBanner title={'Create Your Dream Desk Setup'} subtitle={'RECOMMENDATION'} cta={'view'} />
        </div>
        <div className={styles.favSaleContainer}>
          <ProductCarousel title={'Trending Now'} type="trending_now"/>
        </div>
        <div className={styles.studentPromotionBanner}>
          <StudentPromotion title={'15% STUDENT DISCOUNT'} subtitle={'Sign Up as student and get your 15% discount to ACE your academic Exam'} cta={'GET YOUR DISCOUNT'} />
        </div>
      </Layout>
  )
}

export default LandingPage
