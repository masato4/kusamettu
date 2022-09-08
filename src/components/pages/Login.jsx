import { React, useState } from "react";
import {
  signInWithPopup,
  GithubAuthProvider,
  signOut,
  getAdditionalUserInfo,
} from "firebase/auth";
import { Button } from "@mantine/core";
import { auth } from "../../firebase";
import LogedIn from "./LogedIn";
import { NotLogin } from "../views/NotLogin";
import { tokenAtom } from "../../atoms/TokenAtom";
import { useSetRecoilState } from "recoil";

export const Login = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState();
  const [userName, setUserName] = useState("");
  const setGitToken = useSetRecoilState(tokenAtom);
  const login = () => {
    const provider = new GithubAuthProvider();
    provider.addScope("repo");
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        setToken(credential.accessToken);
        setGitToken(credential.accessToken);
        // The signed-in user info.
        const addInfo = getAdditionalUserInfo(result);
        setUserName(addInfo.username);
        setUser(result.user);
        console.log(userName);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const { email } = error.customData;
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
          <LogedIn
            token={token}
            user={user}
            setToken={setToken}
            userName={userName}
          />
        </>
      )}
    </>
  );
};
