import React from 'react';
import styles from './Layout.module.css';
import { Fragment } from 'react';
import MainNavigation from './MainNavigation';

const Layout = ({children}) => {
  return (
    <Fragment>
      <MainNavigation/>
      <main className={styles.main}>
        {children}
      </main>
    </Fragment>
  )
}

export default Layout