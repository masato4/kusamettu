import React from "react";
import { signOut } from "firebase/auth";
import { Button } from "@mantine/core";
import { auth } from "../../firebase";

const LogedIn = ({ user, setToken }) => {
  return (
    <>
      <div>Logedin</div>

      <Button
        onClick={() => {
          signOut(auth).then((result) => {
            console.log(result);
            setToken("");
          });
        }}
      >
        Logout
      </Button>
      <div>{user.displayName}</div>
    </>
  );
};

export default LogedIn;
