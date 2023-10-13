// import React, { useEffect, useState } from "react";
// import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// const App = () => {
//     // fetching all users from  http://localhost:3403/api/getusers
//     const [users, setUsers] = useState([]);
//     useEffect(() => {
//         const getUsers = async () => {
//             const response = await fetch("http://localhost:3403/api/getusers");
//             const data = await response.json();
//             setUsers(data);
//         };

//         getUsers();
//     }, []);

//     return (
//         <>
//             <div>
//                 {users.map((user) => (
//                     <li key={user.id}>{user.name}</li>
//                 ))}
//             </div>
//         </>
//     );
// };

// export default App;

import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

const App = () => {
    //     const [isAuthenticated, setIsAuthenticated] = useState(false);

    //     const checkAuthenticated = async () => {
    //         try {
    //             const response = await fetch("http://localhost:3403/api/auth/is-verify", {
    //                 method: "GET",
    //                 headers: { token: localStorage.token }
    //             });
    //             console.log(response);
    //             const parseRes = await response.json();
    //             console.log(parseRes);
    //             parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    //         } catch (error) {
    //             console.error(error.message);
    //         }
    //     };

    //     useEffect(() => {
    //         checkAuthenticated();
    //     }, []);

    return (
        <>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        {/* <Route
                            index
                            element={
                                !isAuthenticated ? (
                                    <Login />
                                ) : (
                                    <Navigate replace to={<Register />} />
                                )
                            }
                        /> */}
                        {/* <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="*" element={<h1>Not Found</h1>} /> */}
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    );
};

export default App;
