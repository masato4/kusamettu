import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { AppShell, Button, Group, Header, Navbar, Text } from "@mantine/core";
import { auth, db } from "../../firebase";
import UserInfo from "./UserInfo";
import { doc, getDoc } from "firebase/firestore";
import Main from "../views/Main";


const LogedIn = ({ token, user, setToken }) => {
  const [userInfo, setUserInfo] = useState("");
  const check = async () => {
    const docRef = doc(db, "users", user.uid);
    await getDoc(docRef)
      .then((data) => {
        data.exists() ? setUserInfo(data.data()) : setUserInfo("yet");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    check();
  }, []);

  return (
    <>
      {userInfo !== "yet" ? (
        <AppShell
          padding="md"
          // navbar={
          //   <Navbar width={{ base: 300 }} height={500} p="xs">
          //     {/* Navbar content */}
          //   </Navbar>
          // }
          header={
            <Header height={60} p="xs">
              <>
                <Group
                  position="apart"
                  style={{ marginLeft: 20, marginRight: 20 }}
                >
                  {/* <Text>{user.displayName}</Text> */}
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
                </Group>
              </>
            </Header>
          }
        >
          <Main />

          {/* <div>{user.displayName}</div> */}
          {/* Your application here */}
        </AppShell>
      ) : (
        <>
          <UserInfo token={token} user={user} />
        </>
      )}
    </>
  );
}

export default LogedIn;
