import React, {useEffect, useState} from 'react';
import fetch from 'isomorphic-fetch';
import ReactLoading from 'react-loading';

async function api() {
    const promise = await fetch('https://api.coindesk.com/v1/bpi/historical/close.json');
    return await promise.json()
}

export default function Trend({type, show}) {
    const [trend, setTrend] = useState(null);
    useEffect(() => {
        if (trend === null) {
            getToken();
        }
    });

    useEffect(() => {
        if (trend !== null) {
            var options = {
                title: 'Bitcoin Price',
                curveType: 'function',
                legend: {position: 'bottom'},
                'chartArea.width': '600',
                'chartArea.left': '0',
                width: 490
            };

            var chart = new google.visualization.LineChart(document.querySelector('.chart-section-' + type));
            chart.draw(trend, options);
        }
    }, [trend]);

    const getToken = async () => {
        let data = await api();
        const chartData = Object.entries(data.bpi);
        chartData.unshift(['Year', 'Price']);
        setTrend(google.visualization.arrayToDataTable(chartData));
    };

    return <>
        {trend === null
        ? <div className="loader"><ReactLoading type="spin" color="#ccd"/></div>
        : <div className={`chart-section-${type}`}
               style={{'display': show ? 'block' : 'none', 'width': '900px', 'height': '300px'}}></div>}

        <style jsx>{`
            .loader {
                margin: 0 auto;
                text-align: center;
            }
        `}</style>
    </>
}