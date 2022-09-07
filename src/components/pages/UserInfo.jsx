import { Autocomplete, Button, NumberInput, Stack } from "@mantine/core";
import { doc, setDoc, updateDoc, increment, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../firebase";
import createGithubRepository from "../../tools/githubRestApis";

const UserInfo = ({ token, user, setUserInfo, userInfo, setOpened }) => {
  const [repo, setRepo] = useState(userInfo?.repo || "");
  const [path, setPath] = useState(userInfo?.path || "");
  const [weight, setWeight] = useState(userInfo?.weight);
  const [isSubmit, setIsSubmit] = useState(false);
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
      name: user.displayName,
      token: token,
      repo: repo,
      path: path,
      weight: weight,
    });

    const createGithub = () =>
      createGithubRepository(
        "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",
        "yashiro-ryo",
        repo
      ).then(() => {
        console.log("リポジトリ生成完了!");
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
    <>
      {isSubmit ? (
        <></>
      ) : (
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
          <NumberInput
            // placeholder="体重"
            // data={[]}
            value={weight}
            onChange={setWeight}
          />
          {/* <Autocomplete /> */}
          <Button
            onClick={() => {
              addUserInfo();
              check();
              setOpened(false);
            }}
          >
            submit
          </Button>
        </Stack>
      )}
    </>
  );
};

export default UserInfo;
