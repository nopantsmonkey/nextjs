import React, {useState, useEffect} from 'react';
import Layout from '../components/layout';
import ReactLoading from 'react-loading';
import fetch from 'isomorphic-fetch';
import Trend from '../components/trend';

async function fetchAPI() {
    const promise = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
    return await promise.json();
}

function Index() {
    let [response, setResponse] = useState(null);

    useEffect(() => {
        setTimeout(() => fetchAPI().then(res => setResponse(res)), 2000);
    }, [fetchAPI]);

    return (
        <>
            <Layout title="Home">
                <h1>Bitcoin Price Daily Rate</h1>

                {
                    response === null
                        ? <div className="loader"><ReactLoading type="spin" color="#ccd"/></div>
                        : <ResponseRender data={Object.values(response.bpi)}/>
                }

                <style jsx>{`
                    h1 {
                        position: relative;
                        margin: 0 auto;
                        text-align: center;
                    }
                    .loader {
                        text-align: -webkit-center;
                        margin-top: 30px;
                    }
            `}</style>
            </Layout>
        </>
    )
}

function ResponseRender({data}) {
    const [items, setItems] = useState(data.map(d => ({...d, show: false})));
    const showTrend = item => {
        setItems([...items].map(i => ({
            ...i,
            show: i.code === item.code && !i.show
        })));
    };

    return (
        <>
            <div className="list-group">
                {
                    items.map(item => {
                        const {code, rate_float, show} = item;
                        return (
                            <div key={code}>
                                <div className="card border-primary mb-3" style={{'maxWidth': '40rem'}}>
                                    <div className="card-header">
                                        <a className="list-group-item list-group-item-action active">1 BTC equals {rate_float} {code}
                                            <button onClick={_ => showTrend(item)}>{show ? 'Hide' : 'Show'} Monthly Trend</button>
                                        </a>
                                    </div>
                                    {show && <Trend type={code} show={show} />}

                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <style jsx>{`
                .list-group-item.list-group-item-action button {
                    float: right;
                    clear: both;
                }
            `}</style>
        </>
    );
}

export default Index;