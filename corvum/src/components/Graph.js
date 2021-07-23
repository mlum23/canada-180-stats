import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import React, { useEffect, useState } from 'react';
const Graph = ({ graphInfo, province }) => {

    let [graphData, setGraphData] = useState(null);

    const getProvinceInfo = () => {
        console.log('getPronvinceInfo');
        for (const info of graphInfo) {
            if (info.province === province) {
                console.log(info);
                return info.data;
                // setGraphData(info);
            }
        }
    }




    return (
        <LineChart width={600} height={300} data={getProvinceInfo()} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="total_cases" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="date" />
            <YAxis />
        </LineChart>
    )
}

export default Graph;