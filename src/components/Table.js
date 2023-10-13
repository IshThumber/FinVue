// import {
//     ArrowDownTrayIcon,
//     MagnifyingGlassIcon
// } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    Typography,
    CardBody
} from "@material-tailwind/react";
// import Addtransaction from "../pages/Addtransaction";

const TABLE_HEAD = ["Id", "Transaction", "Amount", "Date", ""];

// const TABLE_ROWS = [
//     {
//         name: "Spotify",
//         amount: "$2,500",
//         date: "12/9 3:00pm"
//     }
// ];

const Tabletrans = () => {
    const [data, setData] = useState([]);

    const url = "http://localhost:3403/api/v1/get_table";
    // `https://dev-548906937g90703.api.raw-labs.com/your/endpoint/2`
    const fetchData = async () => {
        return await fetch(url)
            .then((res) => res.json())
            .then((json) => setData(json));
    };
    useEffect(() => {
        fetchData();
    }, []);
    console.log(data);
    return (
        <>
            {/* <Addtransaction /> */}
            <Card className="h-full w-full bg-green-300 rounded-3xl overflow-x-hidden">
                <CardHeader
                    floated={false}
                    shadow={false}
                    className="rounded-none"
                >
                    <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Recent Transactions
                            </Typography>
                            <Typography
                                color="gray"
                                className="mt-1 font-normal"
                            >
                                These are details about the last transactions
                            </Typography>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="overflow-hidden px-0">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-sans leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(
                                (
                                    { trans_id, name, amount, transactionDate },
                                    index
                                ) => {
                                    const isLast = index === data.length - 1;
                                    const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={trans_id}>
                                            <td className={classes}>
                                                <div className="flex items-center gap-3">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className=""
                                                    >
                                                        {trans_id}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex items-center gap-3">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className=""
                                                    >
                                                        {name}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-sans"
                                                >
                                                    {amount}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-sans"
                                                >
                                                    {transactionDate}
                                                </Typography>
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </>
    );
};

export default Tabletrans;
