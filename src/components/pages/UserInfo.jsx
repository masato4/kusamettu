import { Autocomplete, Button, NumberInput, Stack, Text } from "@mantine/core";
import { doc, setDoc, updateDoc, increment, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../firebase";
import restApis from "../../tools/githubRestApis";

const UserInfo = ({
  token,
  user,
  setUserInfo,
  userInfo,
  setOpened,
  userName,
}) => {
  const [repo, setRepo] = useState(userInfo?.repo || "");
  const [weight, setWeight] = useState(userInfo?.weight || "");
  // const [name, setName] = useState(userName);
  const [met, setMets] = useState();
  // const docref = doc(db, "users", user.uid);
  const increase = () => {};
  const get = () => {
    getDoc(docref).then((data) => {
      console.log(data.data());
    });
  };
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

  const addUserInfo = () => {
    const docref = doc(db, "users", user.uid);
    setDoc(docref, {
      name: name,
      token: token,
      repo: repo,
      weight: weight,
    });

    console.log("userName: " + userInfo.name);
    console.log("token :" + token);
    console.log("repo :" + repo);
    console.log("repo 作るよー");
    restApis.creaetGithubRepository(token, userName, repo);
    console.log("リポジトリつくたったわwwwww");
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
    <>
      <Stack>
        {/* <Autocomplete label="name" data={[]} value={name} onChange={setName} /> */}
        <Text>
          <Text color="gray">ユーザー名</Text>
          {userName}
        </Text>
        <Autocomplete
          label="作成するリポジトリ名"
          placeholder="repository"
          data={[]}
          value={repo}
          onChange={setRepo}
        />
        <NumberInput
          // placeholder="体重"
          // data={[]}
          label="体重"
          value={weight}
          onChange={setWeight}
        />
        {/* <Autocomplete /> */}
        <Button
          disabled={repo === "" || weight === ""}
          onClick={() => {
            addUserInfo();
            check();
            setOpened(false);
          }}
        >
          submit
        </Button>
      </Stack>
    </>
  );
};

export default UserInfo;
