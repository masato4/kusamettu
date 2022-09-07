
import { Autocomplete, Button, NumberInput, Stack } from "@mantine/core";
import { doc, setDoc, updateDoc, increment, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../firebase";

const UserInfo = ({ token, user }) => {
  const [repo, setRepo] = useState();
  const [path, setPath] = useState();
  const [weight, setWeight] = useState();
  const [met, setMets] = useState();
  const docref = doc(db, "users", user.uid);
  const increase = () => {};
  const get = () => {
    getDoc(docref).then((data) => {
      console.log(data.data());
    });
  };

  const addUserInfo = () => {
    setDoc(docref, {
      name: user.displayName,
      token: token,
      repo: repo,
      path: path,
      weight: weight,
    });
  };
  const addMets = () => {
    getDoc(doc(db, "users", user.uid, "mets", user.uid)).then((data) => {
      console.log(data.data());
    });
    updateDoc(doc(db, "users", user.uid, "mets", user.uid), {
      mets: increment(met),
    });
  };
  return (
    <Stack align="center">
      <Autocomplete
        placeholder="repository"
        data={[]}
        value={repo}
        onChange={setRepo}
      />
      <Autocomplete
        placeholder="path"
        data={[]}
        value={path}
        onChange={setPath}
      />
      <Autocomplete
        placeholder="体重"
        data={[]}
        value={weight}
        onChange={setWeight}
      />
      <Button
        onClick={() => {
          addUserInfo();
        }}
      >
        submit
      </Button>
      {/* <NumberInput onChange={setMets} value={met} /> */}
      {/* <Button onClick={get}>Get</Button>
      <Button
        onClick={() => {
          increase();
          addMets();
        }}
      >
        increase
      </Button> */}
    </Stack>
  );

};

export default UserInfo;
