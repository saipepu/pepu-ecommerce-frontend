import React, { useEffect, useState } from 'react';
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { ActionIcon, Text } from '@mantine/core';
import 'swiper/css'
import 'swiper/scss/navigation'
import 'swiper/css/virtual'
import styles from './style.module.scss'
import { useSelector , useDispatch} from 'react-redux';
import { API } from '../../config';
import { fetchProduct } from '../../redux/product/action';
import { Heart, ShoppingCart } from 'tabler-icons-react';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../redux/cart/action';

const ProductCarousel = ({type, referenceCategory}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchSingleCategory = async (id) => {
    const res = await fetch(`${API}/category/getSingle/${id}`, {
      method: "GET"
    }).then(response => {
      return response.json()
    }).catch(err => {
      console.log(err);
    })
    console.log(res);
  }

  useEffect(() => {
    if(referenceCategory?.parentId) {
      fetchSingleCategory(referenceCategory.parentId)
    }
  },[referenceCategory])

  const [matches, setMatches] = useState(false);
  const { products } = useSelector((state) => state.productReducer)
  console.log(products);
  const { allCategories } = useSelector((state) => state.allCategoryReducer)
  console.log(allCategories);
  const saleFavourite = products?.message;
  let relatedProducts = []
  const trending = []
  let data = [];
  let title = ''
  let relatedCategories = []

  if(referenceCategory?.parentId){
    for(let i=0; i<allCategories?.message.length; i++) {
      if(allCategories?.message[i]?.parentId == referenceCategory?.parentId || allCategories?.message[i]._id == referenceCategory?.parentId){
        // console.log(allCategories?.message[i], 'related category')
        relatedCategories.push(allCategories?.message[i])
      }
    }
  } else {
    for(let i=0; i<allCategories?.message?.length; i++) {
      if(allCategories?.message[i]?.parentId == referenceCategory?._id){
        relatedCategories.push(allCategories?.message[i])
      }
    }
  }
  console.log(relatedCategories)
  for(let i=0; i<relatedCategories?.length; i++) {
    for(let j=0; j<products?.message?.length; j++){
      if(products?.message[j]?.category == relatedCategories[i]?._id){
        // console.log(products?.message[j])
        relatedProducts.push(products?.message[j])
      }
    }
  }

  switch(type){
    case 'sale_favourite': {
      title = 'Sale Favourite'
      data = saleFavourite
      break
    };
    case 'related_products': {
      title = 'Related Products'
      data = relatedProducts
      break
    };
    case 'trending': {
      title = 'Trending'
      data = trending;
      break
    };
    default: {
      title = 'No title'
      data = []
      break
    }
  }

  useEffect(() => {
    const media = window.matchMedia('(max-width: 800px)')
    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener)
    return () => window.removeEventListener('resize', listener)
  }, [matches])

  const navigateProductPage = (id) => {
    navigate(`/product/${id}`)
  }
  
  const cartHandler = (id,name,price) => {
    const value = {id: id, name: name, price: price}
    dispatch(addToCart(value))
  }

  return (
    <>
    <div className={styles.swiperContainer}>
      <Text className={styles.title}>{title}</Text>
      {data?.length > 0 ? (
          <Swiper
          className={styles.swiper}
          spaceBetween={40}
          loop={data?.length > 3 ? true : false} modules={[Navigation]}
          navigation={true}
          slidesPerView={matches ? 1 : 3}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {data?.map((item, index) => (
            <SwiperSlide key={index} style={{ padding: '10px', paddingBottom: '30px'}}>
              <div className={styles.productCard}>
                <div className={styles.productImage} onClick={() => navigateProductPage(item._id)}>
                  <img src={`${API}/product/photo/${item._id}`} alt={item.name} />
                </div>
                <div className={styles.cardAction}>
                  <div className={styles.name}>
                    {item.name}
                  </div>
                  <div className={styles.details}>
                    {item.description}
                  </div>
                  <div className={styles.price}>
                    $ {item.price}
                  </div>
                  <div className={styles.actionIconGp}>
                    <ActionIcon><Heart /></ActionIcon>
                    <ActionIcon onClick={() => cartHandler(item._id, item.name, item.price)}><ShoppingCart /></ActionIcon>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ): (
        <h1 style={{ minHeight: '380px'}}>NO DATA</h1>
      )}
    </div>
    </>
  )
}
export default ProductCarousel;