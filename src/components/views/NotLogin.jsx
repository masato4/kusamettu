import { Button } from "@mantine/core";
import React from "react";

const NotLogin = ({ login }) => {
  return (
    <>
      <div>
        <Button className="text" onClick={login}>
          Login
        </Button>
      </div>
    </>
  );
};

export default NotLogin;
