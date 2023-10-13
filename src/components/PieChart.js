import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";

const DynamicPieChart = () => {
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

    // print the number of amount which is greater then 500

    let a = data.map(({ amount }) => amount);

    const result1 = a.filter((amount) => amount >= 50);
    const result2 = a.filter((amount) => amount < 50);

    const labels = [">=60", "<60"];
    return (
        <div className="w-full">
            <Pie
                data={{
                    labels: labels,
                    datasets: [
                        {
                            backgroundColor: ["#FF6384", "#36A2EB"],
                            hoverBackgroundColor: ["#FF6384", "#36A2EB"],
                            borderColor: "",
                            data: [result1.length, result2.length]
                        }
                    ]
                }}
                options={{
                    responsive: true,
                    title: {
                        display: true,
                        text: "My Pie Chart",
                        fontSize: 16
                    },
                    plugins: {
                        legend: {
                            display: false,
                            position: "bottom"
                        }
                    }
                }}
            />
        </div>
    );
};

export default DynamicPieChart;
