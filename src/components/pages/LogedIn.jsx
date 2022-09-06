import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { AppShell, Button, Group, Header, Navbar, Text } from "@mantine/core";
import { auth } from "../../firebase";
import UserInfo from "./UserInfo";

const LogedIn = ({ user, setToken }) => {
  const [userInfo, setUserInfo] = useState();
  return (
    <>
      {!userInfo ? (
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
                  <Text>{user.displayName}</Text>
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
          <div>Logedin</div>

          <div>{user.displayName}</div>
          {/* Your application here */}
        </AppShell>
      ) : (
        <>
          <UserInfo />
        </>
      )}
    </>
  );
};

export default LogedIn;
