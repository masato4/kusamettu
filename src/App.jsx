import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Login } from "./components/pages/Login";
import LogedIn from "./components/pages/LogedIn";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "./atoms/TokenAtom";

function App() {
  const token = useRecoilValue(tokenAtom);
  const client = new ApolloClient({
    uri: "https://api.github.com/graphql",
    headers: { authorization: `Bearer ${token}` },
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <link href="https://fonts.googleapis.com/earlyaccess/nicomoji.css" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&display=swap" rel="stylesheet" />
      <div className="App">
        <Login />
        {/* <LogedIn /> */}
      </div>
    </ApolloProvider>
  );
}

export default App;
