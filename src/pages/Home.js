import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Tabletrans from "../components/Table";
import Addtransaction from "./Addtransaction";
// import AreaChart from "./../components/AreaChart";
import DynamicPieChart from "./../components/PieChart";
import DynamicChart from "./../components/AreaChart";
import DynamisBarChart from "./../components/BarChart";

const initialList = [
    {
        id: 1000,
        name: "Spotify",
        amount: "$2,500",
        date: "12/9 3:00pm"
    }
];

const Home = () => {
    const [list, setList] = useState(initialList);

    const setListFunction = (addListProp) => {
        setList([...list, addListProp]);
    };

    console.log(list);
    return (
        <>
            <div className="font-sans">
                <Navbar />

                <div className="w-full flex flex-col md:flex-row justify-center">
                    <div className="bg-white shadow-md border border-blue-gray-50 rounded-3xl aspect-21/9 w-full md:w-3/4 p-2  m-5 items-center">
                        <span className="p-3 mt-3 text-2xl font-bold">
                            Transaction Analytics
                        </span>
                        <div className="mt-5">
                            <DynamicChart
                                setListFunction={setListFunction}
                                list={list}
                            />
                        </div>
                    </div>
                    <div className="bg-white shadow-md border border-blue-gray-50 rounded-3xl h-full flex flex-col aspect-square w-2/12 md:w-2/12 m-5 p-9">
                        <span className="text-2xl font-bold text-left">
                            Stats
                        </span>
                        <DynamicPieChart />
                    </div>
                </div>

                <div className="">
                    <Addtransaction setListFunction={setListFunction} />
                </div>
                <div className="bg-amber-200 w-full flex flex-row p-3">
                    <div className="w-full shadow-none rounded-3xl border-2 border-black">
                        <Tabletrans list={list} />
                    </div>
                </div>

                <DynamisBarChart />
            </div>
        </>
    );
};

export default Home;
