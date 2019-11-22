import Head from 'next/head';

const Header = ({title}) => (
    <Head>
        <title>{title && `${title} - `}Next.js Demo App</title>
        <link rel="favicon" href="/favicon.ico"/>
        <link rel="stylesheet" href="https://bootswatch.com/4/journal/bootstrap.min.css"/>
    </Head>
);

export default Header;