"use client";

import styles from './navLink.module.css';
import Link from "next/link";
import { usePathname } from "next/navigation"

const NavLink = ({item}) => {
	const pathName = usePathname();

	return (
		<Link
			href={item.to}
			className={`${styles.container} ${pathName === item.to && styles.active}`}
		>
			{item.label}
		</Link>
	)
}

export default NavLink;
