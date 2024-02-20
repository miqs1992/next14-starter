import Link from "next/link";

const NotFound = () => {
	return (
		<div>
			<h2>Not Found</h2>
			<p>Sorry, we could not find what you were looking for.</p>
			<Link href={'/'}>Return home</Link>
		</div>
	);
};

export default NotFound;
