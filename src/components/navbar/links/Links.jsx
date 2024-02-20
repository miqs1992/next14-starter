import Link from "next/link";

const Links = () => {
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
		<div>
			{links.map((link) => (
				<Link href={link.to} key={link.label}>{link.label}</Link>
			))}
		</div>
	);
}

export default Links;
