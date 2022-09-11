import { Autocomplete, ActionIcon, Text, Button } from '@mantine/core'
import React, { useState } from 'react'
import { Heart, Search, ShoppingCartPlus, User } from 'tabler-icons-react';
import styles from './style.module.scss'
import { Squash as Hamburger} from 'hamburger-react'
import Cart from './Cart';

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const [value, setValue] = useState();
  const autoCompleteData = ['testing', 'testing 1', 'testing 2']
  const [cart, setCart] = useState(false);

  const cartHandler = () => {
    setCart(!cart);
  }

  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.header}>
            <div className={styles.hamburger}>
              <Hamburger toggled={isOpen} toggle={setOpen}/>
            </div>
            <div className={styles.searchField}>
              <Autocomplete
                value={value}
                onChange={setValue}
                placeholder="search products..."
                data={autoCompleteData}
                icon={<Search />}
              />
            </div>
              <div className={styles.logoWrapper}>
                <p className={styles.logo}>OLIVIA</p>
              </div>
              <div className={styles.btn_gp}>
                <ActionIcon>
                  <User />
                </ActionIcon>
                <ActionIcon>
                  <Heart />
                </ActionIcon> 
                <ActionIcon onClick={() => cartHandler()}>
                  <ShoppingCartPlus />
                </ActionIcon>
              </div>
              {cart && (
                <div className={styles.cartHandler}>
                  <Cart />
                  </div>
              )}
          </div>
          <div className={styles.navbarContainer}>
            <div className={styles.searchField}>
              <Autocomplete
                value={value}
                onChange={setValue}
                placeholder="search products..."
                data={autoCompleteData}
                icon={<Search />}
              />
            </div>
            <ul>
              <li className={styles.navlinks}><Text>SALE</Text></li>
              <li className={styles.navlinks}><Text>NEW IN</Text></li>
              <li className={styles.navlinks}><Text>ELECTRONICS</Text></li>
              <li className={styles.navlinks}><Text>PEN</Text></li>
              <li className={styles.navlinks}><Text>PENCIL</Text></li>
              <li className={styles.navlinks}><Text>BOOK</Text></li>
              <li className={styles.navlinks}><Text>ACCESSORIES</Text></li>
              <li className={styles.navlinks}><Text>GIFTS</Text></li>
            </ul>
          </div>
        </div>
    </>
  )
}

export default Header
