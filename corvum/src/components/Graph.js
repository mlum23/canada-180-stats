import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
const Graph = ({ graphInfo, province, dataKey, compareProvince }) => {

    const getProvinceInfo = (province) => {
        for (const info of graphInfo) {
            if (info.province === province) {
                return info.data;
            }
        }
    }

    const showCompare = () => {
        if (compareProvince != null) {
            return (
                <Line
                    type="monotone"
                    data={getProvinceInfo(compareProvince)}
                    dataKey={dataKey}
                    stroke="#ff84d8"
                    dot={false}
                />
            )

        }

    }

    return (

        <LineChart
            width={600}
            height={300}
            margin={{ top: 5, right: 20, bottom: 5, left: 25 }}
        >
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <XAxis dataKey="date" allowDuplicatedCategory={false} />
            <YAxis />
            <Tooltip />
            <Line
                type="monotone"
                data={getProvinceInfo(province)}
                dataKey={dataKey}
                stroke="#8884d8"
                dot={false}
            />
            {showCompare()}

        </LineChart>
    )
}

export default Graph;