// import "./App.css";
// import React, { useState, useEffect } from "react";
// import Login from "./form/Login";
// import Register from "./form/Register";
// import { ChakraProvider } from "@chakra-ui/react";

// import { Home } from "@material-ui/icons";

// function App() {
//   const [page, setPage] = useState("login");
//   const [token, setToken] = useState();

//   useEffect(() => {
//     const auth = localStorage.getItem("auth_token");
//     setToken(auth);
//   }, [token]);

//   const chosePage = () => {
//     if (page === "login") {
//       return <Login setPage={setPage} />;
//     }
//     if (page === "register") {
//       return <Register setPage={setPage} />;
//     }
//   };

//   const pages = () => {
//     if (token == null) {
//       return (
//         <div className="min-h-screen bg-blue-400 flex justify-center items-center">
//           <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
//             {chosePage()}
//           </div>
//         </div>
//       );
//     } else {
//       return (
//         <ChakraProvider>
//         </ChakraProvider>
//         );
//     }
//   };

//   return <React.Fragment>{pages()}</React.Fragment>;
// }

// export default App;

import React, { useContext, useEffect, useState } from "react";

import Register from "./components/Register";
import Login from "./components/Login";
import Header from "./components/Header";
import Table from "./components/Table";
import { UserContext } from "./context/UserContext";

const App = () => {
  const [message, setMessage] = useState("");
  const [token] = useContext(UserContext);

  const getWelcomeMessage = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch("/api", requestOptions);
    const data = await response.json();

    if (!response.ok) {
      console.log("something messed up");
    } else {
      setMessage(data.message);
    }
  };

  useEffect(() => {
    getWelcomeMessage();
  }, []);

  return (
    <>
      <Header title={message} />
      <div className="columns">
        <div className="column"></div>
        <div className="column m-5 is-two-thirds">
          {!token ? (
            <div className="columns">
              <Register /> <Login />
            </div>
          ) : (
            <Table />
          )}
        </div>
        <div className="column"></div>
      </div>
    </>
  );
};

export default App;