import { React, useState } from "react";
import { signInWithPopup, GithubAuthProvider, signOut } from "firebase/auth";
import { Button } from "@mantine/core";
import { auth } from "../../firebase";
import LogedIn from "./LogedIn";
import NotLogin from "../views/NotLogin";
export const Login = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState();

  const login = () => {
    const provider = new GithubAuthProvider();
    provider.addScope("repo");
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        setToken(credential.accessToken);
        // The signed-in user info.

        setUser(result.user);
        console.log(token, user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <>
      {token === "" ? (
        <>
          <NotLogin
            login={() => {
              login();
            }}
          />
        </>
      ) : (
        <>
          <LogedIn token={token} user={user} setToken={setToken} />
        </>
      )}
    </>
  );
};
