import { React, useState } from "react";
import {
  signInWithPopup,
  GithubAuthProvider,
  signOut,
  getAdditionalUserInfo,
} from "firebase/auth";
import { Button } from "@mantine/core";
import { auth, db } from "../../firebase";
import LogedIn from "./LogedIn";
import { NotLogin } from "../views/NotLogin";
import { tokenAtom } from "../../atoms/TokenAtom";
import { useSetRecoilState } from "recoil";
import { doc, updateDoc, increment } from "firebase/firestore";

export const Login = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState();
  const [userName, setUserName] = useState("");
  const [diff, setDiff] = useState("");
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
        // ...
      })
      .then(async () => {
        const today = new Date();
        const last = new Date(Number(user.metadata.lastLoginAt));
        const difftime = today - last;
        setDiff(Math.floor(difftime / 1000 / 60 / 60) % 24);
        // await updateDoc(doc(db, "users", user.uid), {
        //   calories: increment(-1 * diff * 5),
        // });
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
            diff={diff}
          />
        </>
      )}
    </>
  );
};
