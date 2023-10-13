import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

// const generateRandomData = (min, max, numPoints) => {
//     const data = [];
//     for (let i = 0; i < numPoints; i++) {
//         const randomValue = Math.floor(Math.random() * (max - min + 1) + min);
//         data.push(randomValue);
//     }
//     return data;
// };

const DynamicChart = () => {
    const [data, setData] = useState([]);
    const url = "http://localhost:3403/api/v1/get_table";
    // `https://dev-548906937g90703.api.raw-labs.com/your/endpoint/2`
    const fetchData = async () => {
        return await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((json) => setData(json));
    };
    useEffect(() => {
        fetchData();
    }, []);

    console.log(data);
    let a, dates;
    a = data.map(({ amount }) => amount);
    dates = data.map(({ transactionDate }) => transactionDate);

    const datesWithoutTime = dates.map((dateString) => {
        const date = new Date(dateString);
        return date.toISOString().substring(0, 10);
    });

    const datesInDDMMYYYYFormat = datesWithoutTime.map((dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-IN");
    });

    console.log(datesInDDMMYYYYFormat); // ["20-09-2023"]
// 
    return (
        <>
            <div className="w-full">
                <>
                    <Line
                        data={{
                            labels: datesInDDMMYYYYFormat,
                            datasets: [
                                {
                                    fill: {
                                        target: "origin",
                                        above: "#36A2"
                                    },
                                    backgroundColor: "#36A2EB",
                                    borderColor: "#36A2EB",
                                    borderWidth: 2,
                                    pointRadius: 5,
                                    data: a,
                                    tension: 0.4
                                }
                            ]
                        }}
                        options={{
                            responsive: true,
                            scales: {
                                x: {
                                    grid: {
                                        display: false // Remove X-axis gridlines
                                    },
                                    title: {
                                        display: false,
                                        text: "Months"
                                    }
                                },
                                y: {
                                    grid: {
                                        display: false // Remove Y-axis gridlines
                                    },
                                    title: {
                                        display: false,
                                        text: "Values"
                                    }
                                }
                            },
                            plugins: {
                                legend: {
                                    display: false
                                }
                            }
                        }}
                    />
                </>
            </div>
        </>
    );
};

export default DynamicChart;
