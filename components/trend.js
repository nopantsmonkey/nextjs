import {useEffect, useState} from 'react';
import fetch from 'isomorphic-fetch';

async function api() {
    const promise = await fetch('https://api.coindesk.com/v1/bpi/historical/close.json');
    return await promise.json()
}

export default function Trend({type, show}) {
    const [trend, setTrend] = useState(null);
    useEffect(() => {
        api().then(r => setTrend(r));
    }, [api]);

    return <>
        <div className="card-body" style={{'display': show ? 'block' : 'none'}}>
            <h4 className="card-title">Primary card title</h4>
            <p className="card-text">Some quick example text to build on the card title and make
                up the bulk of the card's content.</p>
        </div>
    </>
}