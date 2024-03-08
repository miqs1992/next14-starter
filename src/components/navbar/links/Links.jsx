"use client";
import styles from './links.module.css';
import NavLink from "@/components/navbar/links/navLink/navLink";
import {useState} from "react";
import {handleGithubLogout} from "@/lib/actions";

const Links = ({session}) => {
	const [open, setOpen] = useState(false);

	const links = [
		{
			to: '/',
			label: 'Homepage',
		},
		{
			to: '/about',
			label: 'About',
		},
		{
			to: '/contact',
			label: 'Contact',
		},
		{
			to: '/blog',
			label: 'Blog',
		},
	]

	return (
		<div className={styles.container}>
			<div className={styles.links}>
				{links.map((link) => (
					<NavLink item={link} key={link.label}/>
				))}
				{session ? (
					<>
						{session.user?.isAdmin && <NavLink item={{to: '/admin', label: 'Admin'}}/>}
						<form action={handleGithubLogout}>
							<button className={styles.logout}>Logout</button>
						</form>

					</>
				) : <NavLink item={{to: '/login', label: 'Login'}}/>}
			</div>
			<button className={styles.burger} onClick={() => setOpen((prev) => !prev)}>Menu</button>
			{
				open && (
					<div className={styles.mobileLinks}>
						{links.map((link) => (
							<NavLink item={link} key={link.label}/>
						))}
						{session ? (
							<>
								{isAdmin && <NavLink item={{to: '/admin', label: 'Admin'}}/>}
								<button className={styles.logout}>Logout</button>
							</>
						) : <NavLink item={{to: '/login', label: 'Login'}}/>}
					</div>
				)
			}
		</div>
	);
}

export default Links;
