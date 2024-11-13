"use client";

import {
    CartesianGrid,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export default function Chart({
    data,
}: {
    data: { key: string; value: number }[];
}) {
    console.log(data);
    return (
        <div className="text-stone-900">
            <LineChart width={800} height={600} data={data}>
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="key" />
                <YAxis />
                <Tooltip />
            </LineChart>
        </div>
    );
}
