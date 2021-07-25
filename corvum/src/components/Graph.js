import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const Graph = ({ graphInfo, province, dataKey, compareProvince }) => {

    const getProvinceInfo = (province) => {
        for (const info of graphInfo) {
            if (info[0].province === province) {
                return info;
            }
        }
    }

    const showCompare = () => {
        if (compareProvince != null) {
            return (
                <Line
                    name={compareProvince}
                    type="monotone"
                    data={getProvinceInfo(compareProvince)}
                    dataKey={dataKey}
                    stroke="#8B0000"
                    dot={false}
                />
            );
        }
    }
    console.log(graphInfo);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart
                width={600}
                height={300}
                margin={{ top: 5, right: 20, bottom: 5, left: 25 }}
            >
                <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                <XAxis dataKey={dataKey} allowDuplicatedCategory={false} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    name={province}
                    type="monotone"
                    data={getProvinceInfo(province)}
                    dataKey={dataKey}
                    stroke="#4169E1"
                    dot={false}
                />
                {showCompare()}

            </LineChart>
        </ResponsiveContainer>
    )
}

export default Graph;