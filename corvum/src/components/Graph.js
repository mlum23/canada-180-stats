import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
const Graph = ({ graphInfo, province, dataKey }) => {

    const getProvinceInfo = () => {
        console.log('getPronvinceInfo');
        for (const info of graphInfo) {
            if (info.province === province) {
                return info.data;
            }
        }
    }

    return (
        <LineChart
            width={600}
            height={300}
            data={getProvinceInfo()}
            margin={{ top: 5, right: 20, bottom: 5, left: 25 }}
        >
            <Line type="monotone" dataKey={dataKey} stroke="#8884d8" dot={false} />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="date" />
            <YAxis />
        </LineChart>
    )
}

export default Graph;