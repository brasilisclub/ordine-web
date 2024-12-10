'use client'

import React from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from "./sidebar.module.css";

interface SidebarOptionInterface {
  path: string;
  label: string;
}

const sidebarOption: Array<SidebarOptionInterface> = [
  {
    "path": "/",
    "label": "Início"
  },
  {
    "path": "/produtos",
    "label": "Produtos"
  },
  {
    "path": "/comandas",
    "label": "Comandas"
  },
]


function Sidebar() {
  const currentPage = usePathname()
  const navLinks = sidebarOption.map((option, key) => {
    return (
      <Link
        key={`nav-link-${key}`}
        href={option.path}
        className={option.path === currentPage ? styles.active : styles.unactive}
      >
        {option.label}
      </Link>
    )
  }) 

  return(
    <aside className={styles.wrapper}>
      <h1 className={styles.title}>Ordine</h1>
      <nav className={styles.nav}>
        {navLinks}
      </nav>
      <Link href="/user/logout" className={styles.logout}>Sair da Conta</Link>
    </aside>
  )
}

export default Sidebar;
