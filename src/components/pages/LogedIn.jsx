import React, { useState, useRef, useCallback, useEffect } from "react";
import { signOut } from "firebase/auth";
import {
  AppShell,
  Button,
  Group,
  Header,
  Modal,
  Select,
  Stack,
  Text,
} from "@mantine/core";
import { auth, db } from "../../firebase";
import UserInfo from "./UserInfo";
import { NumberInput } from "@mantine/core";
import { useReward } from "react-rewards";
import ReactCanvasConfetti from "react-canvas-confetti";

import restApis from "../../tools/githubRestApis";
import {
  collection,
  doc,
  getDoc,
  increment,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useSetState } from "@mantine/hooks";

import { selectOption } from "../../mets";

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

function getAnimationSettings(angle, originX) {
  return {
    particleCount: 3,
    angle,
    spread: 55,
    origin: { x: originX },
    colors: ["#ACE7AE", "#69C16E", "#549F57", "#386C3E"],
  };
}

const LogedIn = ({ token, user, setToken, userName }) => {
  const [userInfo, setUserInfo] = useSetState({
    name: "",
    repo: "",
    token: "",
    weight: 0,
    calorie: 0,
  });
  // const [mets, setMets] = useState();

  const [opened, setOpened] = useState(false);

  const options = selectOption;

  const refAnimationInstance = useRef(null);
  const [intervalId, setIntervalId] = useState();

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(60, 0));
      refAnimationInstance.current(getAnimationSettings(120, 1));
    }
  }, []);

  const startAnimation = useCallback(() => {
    if (!intervalId) {
      setIntervalId(setInterval(nextTickAnimation, 16));
    }
  }, [nextTickAnimation, intervalId]);

  const pauseAnimation = useCallback(() => {
    clearInterval(intervalId);
    setIntervalId(null);
  }, [intervalId]);

  const stopAnimation = useCallback(() => {
    clearInterval(intervalId);
    setIntervalId(null);
    refAnimationInstance.current && refAnimationInstance.current.reset();
  }, [intervalId]);
  const check = async () => {
    const docRef = doc(db, "users", user.uid);
    await getDoc(docRef)
      .then((data) => {
        data.exists() ? setUserInfo(data.data()) : setOpened(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [mets, setMets] = useState();
  const [minutes, setMinutes] = useState();
  const [calorie, setCalorie] = useState();

  const calculateCalorie = () => {
    const calcu = Math.round(((mets[0] * minutes) / 60) * userInfo.weight);
    setCalorie(calcu);
    console.log(calorie);
  };
  const update = () =>
    updateDoc(doc(db, "users", user.uid), {
      calorie: increment(calorie),
    });
  const addMets = () => {
    const docRef = collection(db, "users", user.uid, "mets");
    setDoc(doc(docRef), {
      do: mets[1],
      mets: mets[0],
      time: Math.round((minutes / 60) * 10) / 10,
      timestamp: serverTimestamp(),
    });
  };
  useEffect(() => {
    check();
    console.log(userInfo);
    // console.log(userInfo.weight);
  }, [opened]);

  const handleGrowGrass = () => {
    console.log("called methods");
    restApis.growGrassToGithub(userInfo.token, userInfo.name, userInfo.repo);
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <>
      <AppShell
        padding="md"
        header={
          <Header height={60} p="xs">
            <>
              <Group position="apart">
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
                <Button
                  onClick={() => {
                    setOpened(true);
                  }}
                >
                  Modal
                </Button>
              </Group>
            </>
          </Header>
        }
      >
        <Modal
          opened={opened}
          onClose={() => {
            setOpened(false);
          }}
        >
          <UserInfo
            token={token}
            user={user}
            userName={userName}
            setOpened={setOpened}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
        </Modal>
        <div className="grid grid-cols-2 grid-rows-2 place-content-center h-[calc(100vh-92px)] ">
          {/* <Stack align="center" spacing="xl" justify="space-around"> */}
          <div className="grid grid-cols-1 grid-rows-3 place-content-center gap-2">
            <div className="grid grid-cols-1 grid-rows-2 place-content-center">
              <span className="text-2xl text-center">メッツを入力</span>
              <div className="mx-[calc(20%)]">
                <Select
                  searchable
                  value={mets}
                  data={options}
                  onChange={setMets}
                  className="min-w-fit w-full"
                />
              </div>
            </div>
            {/* <div>{userInfo.weight}</div> */}
            <div className="grid grid-cols-2 grid-rows-1">
              <div className="grid grid-cols-1 grid-rows-2 place-content-center h-fit gap-2">
                <span className="text-2xl text-center">体重を入力</span>
                <NumberInput
                  className="w-full px-10"
                  value={userInfo.weight}
                  onChange={(val) => {
                    setUserInfo({ weight: val });
                  }}
                  placeholder="体重を入力してください"
                  // label="体重を入力してください"
                  withAsterisk
                />
              </div>
              <div className="grid grid-cols-1 grid-rows-2 place-content-cente h-fit gap-2">
                <span className="text-2xl text-center">時間を入力</span>
                <div className="flex items-center mx-10 p-0">
                  <NumberInput
                    className="w-full"
                    value={minutes}
                    withAsterisk
                    onChange={(val) => {
                      setMinutes(val);
                    }}
                  />
                  <span className="text-xl px-2 py-0 my-0">分</span>
                </div>
              </div>
            </div>
            <Button
              onClick={() => {
                calculateCalorie();
              }}
            >
              calculateCalorie
            </Button>
            <Text>{calorie}</Text>
            <Button
              // disabled={isAnimating1}

              onClick={() => {
                startAnimation();
                setTimeout(pauseAnimation, 2000);
                addMets();
                handleGrowGrass();
              }}
              radius="md"
              className="mx-[calc(30%)]"
            >
              送信
            </Button>
          </div>
          {/* </Stack> */}

          <div className="flex flex-col h-">wwwwwwwwwww</div>
          <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
        </div>
      </AppShell>
    </>
  );
};

export default LogedIn;
