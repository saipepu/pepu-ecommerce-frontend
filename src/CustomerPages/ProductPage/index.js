import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout'
import { useLocation } from 'react-router';
import { API } from '../../config';
import styles from './style.module.scss'
import { Star, Heart, ShoppingCart } from 'tabler-icons-react';
import { Badge } from '@mantine/core';
import ProductCarousel from '../Components/ProductCarousel';
import { fetchAllCategory } from '../../redux/category/action';
import { useDispatch } from 'react-redux';
import { fetchProduct } from '../../redux/product/action';
import { addToCart } from '../../redux/cart/action';
import { ActionIcon } from '@mantine/core';

const ProductPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProduct())
    dispatch(fetchAllCategory())
  }, [])

  const [item, setItem] = useState()
  const [category, setCategory] = useState();

  const location = useLocation();
  const { pathname } = location;
  const id = pathname.split('/')[2];
  console.log(id);

  const fetchSingleProduct = async (id) => {
    const res = await fetch(`${API}/product/singleProduct/${id}`,{
      method: "GET"
    }).then(response => {
      return response.json()
    }).catch(err => {
      console.log(err);
    })
    console.log(res);
    setItem(res.message);
  }



  const fetchSingleCategory = async (id) => {
    const res = await fetch(`${API}/category/getSingle/${id}`, {
      method: "GET"
    }).then(response => {
      return response.json()
    }).catch(err => {
      console.log(err)
    })
    console.log(res);
    setCategory(res.message);
  }


  useEffect(() => {
    fetchSingleProduct(id);
  }, [id])

  useEffect(() => {
    if(item?.category){
      fetchSingleCategory(item.category);
    }
  }, [item])

  const cartHandler = (id,name,price) => {
    const value = {id: id, name: name, price: price}
    dispatch(addToCart(value))
  }

  return (
      <Layout>
        {item ? (
          <>
          <div className={styles.productDetailContainer}>
            <div className={styles.imgContainer}>
              <img src={`${API}/product/photo/${item._id}`} alt={item.name}/>
            </div>
            <div className={styles.detailContainer}>
              <div className={styles.name}>
                {item.name}
              </div>
              <div className={styles.description}>
                {item.description}
              </div>
              <div className={styles.rating}>
                <p>Rating</p> {[1,2,3,4,5].map((index) => 
                  // {index <= item.rating || 3 ? (
                  //   <Star />
                  // ): (
                  //   <StarOff />
                  // )}
                  (<Star />)
                )}
              </div>
              <div className={styles.price}>
                $ {item.price}
              </div>
              <div className={styles.category} >
                <p>Category</p>
                <Badge variant="filled" style={{ padding: 15}} color="gray">
                  {category?.name}
                </Badge>
              </div>
              <div className={styles.actionIconGp}>
                    <ActionIcon><Heart /></ActionIcon>
                    <ActionIcon onClick={() => cartHandler(item._id, item.name, item.price)}><ShoppingCart /></ActionIcon>
                  </div>
            </div>
          </div>
                  <div className={styles.relatedProducts}>
                  <ProductCarousel type={'related_products'} referenceCategory={category}/>
                </div>
                </>
        ): (
          <div className={styles.productDetailContainer}>
            <h1>NO Data</h1>
          </div>
        )}
      </Layout>
  )
}

export default ProductPage
