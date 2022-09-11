import React, { useEffect, useState } from 'react'
import styles from './style.module.scss'
import { useSelector } from 'react-redux'
import { API } from '../../config/index'
import { Minus, Plus, Trash } from 'tabler-icons-react'
import { decreaseQ, increaseQ, removeFromCart } from '../../redux/cart/action'
import { useDispatch } from 'react-redux'

const Cart = () => {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState([])
  const { carts } = useSelector((state) => state.cartReducer);
  console.log(carts);
  useEffect(() => {
    if(carts) {
      setSelectedItem(carts)
    }
  }, [carts])
  console.log(selectedItem)

  const increaseCart = (id) => {
    console.log(id)
    dispatch(increaseQ(id))
  }
  const decreaseCart = (id) => {
    console.log(id);
    dispatch(decreaseQ(id))
  }
  const removeCart = (id) => {
    console.log(id)
    dispatch(removeFromCart(id))
  }

  return (
    <div className={styles.cartContainer}>
      <h1>Card</h1>
      {selectedItem.length>0 ? (
        <>
        {selectedItem?.map((item, index) => (
          <div className={styles.cartItems} key={index}>
            <div className={styles.cartItemsImg}>
              <img src={`${API}/product/photo/${item.id}`} alt="cartItemsImg" />
            </div>
            <div className={styles.cartItemsDetail}>
              <div className={styles.name}>
                {item.name}
              </div>
              <div className={styles.price}>
                $ {item.price}
              </div>
              <div className={styles.cartActions}>
                <Plus className={styles.actionIcon} onClick={() => increaseCart(item.id)}/>
                <p>{item.quantity}</p>
                <Minus className={styles.actionIcon} onClick={() => decreaseCart(item.id)}/>
                <Trash className={`${styles.actionIcon} ${styles.trash}`} style={{ marginLeft: 'auto' }} onClick={() => removeCart(item.id)}/>
              </div>
            </div>
          </div>
        ))}
        </>
      ): (
        <h3>No item Click the Cart Icon to add some</h3>
      )}
    </div>
  )
}

export default Cart
