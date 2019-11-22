import Head from 'next/head';

const Header = ({title}) => (
    <Head>
        <title>{title && `${title} - `}Next.js Demo App</title>
        <link rel="favicon" href="/favicon.ico"/>
        <link rel="stylesheet" href="https://bootswatch.com/4/journal/bootstrap.min.css"/>
        <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
        <script dangerouslySetInnerHTML={{__html: `google.charts.load('current', {'packages': ['corechart']})`}} />
    </Head>
);

export default Header;