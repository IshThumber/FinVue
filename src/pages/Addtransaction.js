import React from "react";
import { Input } from "@material-tailwind/react";
// import { list } from "./list";

const Addtransaction = ({ setListFunction }) => {
    // const [list, setList] = useState([]);

    const handleSubmit = (e) => {
        // console.log(e.target);
        const id = Math.floor(Math.random() * 10000) + 1;
        const name = e.target.name.value;
        const amount = e.target.amount.value;
        const date = e.target.date.value;

        const addTransaction = {
            id,
            name,
            amount,
            date
        };

        setListFunction(addTransaction);
        e.preventDefault();
    };

    return (
        <>
            <div className="w-1/2 p-5 bg-green-200 m-5">
                <form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        name="name"
                        color="green"
                        size="lg"
                        label="name"
                        outline="true"
                    />
                    <Input
                        type="number"
                        name="amount"
                        color="green"
                        size="lg"
                        label="amount"
                        outline="true"
                    />
                    <Input
                        type="date"
                        name="date"
                        color="green"
                        size="lg"
                        label="date"
                        outline="true"
                        // value={Date.now()}
                        defaultValue={Date()}
                    />

                    <button>Submit</button>
                </form>
            </div>
        </>
    );
};

export default Addtransaction;
