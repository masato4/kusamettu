import "./styles.css";
import { Scene, SceneItem } from "react-scenejs";
import { BambooRender } from "./BambooRender";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { ActionIcon, Autocomplete, Button } from "@mantine/core";
import { AiOutlineEdit } from "react-icons/ai";

export function PandaYoko({ calorie, user }) {
  const [bamboo, setBamboo] = useState(0);
  const [bambooX, setBambooX] = useState([]);
  const [cal, setCal] = useState(100);
  const [edit, setEdit] = useState(true);
  const [name, setName] = useState("このはちゃん");
  const keyframes = {
    ".arm.right": {
      0: "transform: rotate(90deg)",
      1.5: "transform: rotate(-75deg)",
      8: "transform: rotate(-75deg)",
      9: "transform: rotate(90deg)",
    },
    ".arm.right .forearm": {
      0: "transform: rotate(0deg)",
      1.5: "transform: rotate(-15deg)",
      2: "transform: rotate(-25deg)",
      2.5: "transform: rotate(-15deg)",
      3: "transform: rotate(-25deg)",
      3.5: "transform: rotate(-15deg)",
      4: "transform: rotate(-25deg)",
      4.5: "transform: rotate(-15deg)",
      5: "transform: rotate(-25deg)",
      5.5: "transform: rotate(-15deg)",
      6: "transform: rotate(-25deg)",
      6.5: "transform: rotate(-15deg)",
      7: "transform: rotate(-25deg)",
      7.5: "transform: rotate(-15deg)",
      8: "transform: rotate(-25deg)",
      9: "transform: rotate(0deg)",
    },
    ".arm.right .hand": {
      0.5: "transform: rotate(0deg)",
      1.5: "transform: rotate(-60deg)",
      8: "transform: rotate(-60deg)",
      9: "transform: rotate(  0deg)",
    },
    ".arm.left": {
      0: "transform: rotate(0deg)",
      1.5: "transform: rotate(-60deg)",
      8: "transform: rotate(-60deg)",
      9: "transform: rotate(0deg)",
    },
    ".arm.left .forearm": {
      0: "transform: rotate(-40deg)",
      1.5: "transform: rotate(-20deg)",
      2: "transform: rotate(-30deg)",
      2.5: "transform: rotate(-20deg)",
      3: "transform: rotate(-30deg)",
      3.5: "transform: rotate(-20deg)",
      4: "transform: rotate(-30deg)",
      4.5: "transform: rotate(-20deg)",
      5: "transform: rotate(-30deg)",
      5.5: "transform: rotate(-20deg)",
      6: "transform: rotate(-30deg)",
      6.5: "transform: rotate(-20deg)",
      7: "transform: rotate(-30deg)",
      7.5: "transform: rotate(-20deg)",
      8: "transform: rotate(-30deg)",
      9: "transform: rotate(-40deg)",
    },
    ".arm.left .hand": {
      0: "transform: rotate(0deg)",
      1.5: "transform: rotate(-40deg)",
      8: "transform: rotate(-40deg)",
      9: "transform: rotate(0deg)",
    },
    ".mouth": {
      0: "transform: translateY(0px)",
      0.5: "transform: translateY(9px)",
      options: {
        delay: 1,
        iterationCount: 14,
        direction: "alternate",
      },
    },
    ".hand .bamboo": {
      1.5: {
        height: "166px",
      },
      2: "height: 140px",
      2.5: "height: 140px",
      3: "height: 120px",
      3.5: "height: 120px",
      4: "height: 100px",
      4.5: "height: 100px",
      5: "height: 80px",
      5.5: "height: 80px",
      6: "height: 60px",
      6.5: "height: 60px",
      7: "height: 40px",
      7.5: "height: 40px",
      8: "height: 0px",
    },
  };
  const update = async () => {
    await updateDoc(doc(db, "users", user.uid), {
      pandaName: name,
    });
  };
  const chengetext = (e) => {
    console.log([...Array(e.target.value)]);
    setBamboo([...Array(parseInt(e.target.value))]);
  };
  const chengetext2 = (e) => {
    setCal(e.target.value)
    if (parseInt(e.target.value) <= 0) {
      setBamboo(0);
    } else {
      setBamboo(1);
    }
    console.log([...Array(e.target.value)]);
    const x = Math.floor((Math.floor(cal / 5) + parseInt(e.target.value)) / 14);
    let aaa = [];
    for (let i = 0; i < x; i++) {
      aaa.push(14);
    }
    aaa.push(parseInt(e.target.value) % 14);
    setBambooX(aaa);
    console.log(aaa);
  };
  useEffect(() => {
    // console.log(calorie);
    // getDoc(doc(db, "users", user.uid)).then((data) => {
    //   data.exists() && setCal(data.data().calories);
    //   data.exists() && setName(data.data().pandaName);
    //   console.log(data.data().calories);
    // });
    // setCal(calorie);
    if (Math.floor(cal / 5) == 0) {
      setBamboo(0);
      // updateDoc(doc(db, "users", user.uid), {
      //   dead: new Date(),
      // });
    } else {
      setBamboo(1);
    }
    const x = Math.floor(parseInt(Math.floor(cal / 5)) / 14);
    let aaa = [];
    for (let i = 0; i < x; i++) {
      aaa.push(14);
    }
    aaa.push(parseInt(Math.floor(cal / 5)) % 14);
    setBambooX(aaa);
    console.log(Math.floor(calorie / 5));
    // setCal(calorie);
  }, [calorie]);

  useEffect(() => {
    // getDoc(doc(db, "users", user.uid)).then((data) => {
    //   data.exists() && setCal(data.data().calories);
    //   data.exists() && setName(data.data().pandaName);
    //   console.log(data.data());
    // });
  }, []);

  return (
    <>
      <div className="relative">
        <div>
          <input
            type="number"
            placeholder="."
            onChange={chengetext2}
            defaultValue={cal}
            className="absolute top-[600px]] z-30 input input-ghost w-full max-w-xs"
          />
          {/* <div className="card w-96 image-full glass absolute left-[calc(50%)] translate-x-[calc(-50%)] top-[calc(15%)] z-20"> */}
          <div className="card w-96 glass absolute left-[calc(50%)] translate-x-[calc(-50%)] top-[calc(15%)] z-20">
            <div className="card-body">
              <h2 className="card-title font-NikoNiko text-5xl">
                {edit ? (
                  <>
                    {bamboo ? "" : "故"} {name}
                    <ActionIcon
                      size="lg"
                      variant="subtle"
                      color="green"
                      onClick={() => {
                        setEdit(false);
                      }}
                    >
                      <AiOutlineEdit></AiOutlineEdit>
                    </ActionIcon>
                  </>
                ) : (
                  <>
                    <Autocomplete data={[]} value={name} onChange={setName} />
                    <Button
                      color="green"
                      onClick={() => {
                        setEdit(true);
                        update();
                      }}
                    >
                      OK
                    </Button>
                  </>
                )}
              </h2>
              <div className="grid grid-cols-1 m-5 font-Hachi gap-2 place-content-center">
                {bamboo ? (
                  <>
                    <span className=" z-30 text-xl">
                      貯蓄：{Math.floor(cal)}本
                    </span>
                    <span className=" z-20 text-xl">
                      寿命：のこり{Math.floor(cal)}時間！
                    </span>
                    <span className=" z-20 text-xl">期間：20日間生存中！</span>
                  </>
                ) : (
                  <span className=" z-20 text-xl">享年：20日</span>
                )}
              </div>
            </div>
          </div>
          {bamboo ? (
            <Scene
              keyframes={keyframes}
              easing="ease-in-out"
              fillMode="forwards"
              direcition="normal"
              iterationCount={"infinite"}
              // iterationCount={1}
              playSpeed={1}
              delay={0}
              time={0}
              css={false}
              autoplay={true}
              ready={true}
              duration={20}
              onPlay={(e) => {
                console.log(e);
              }}
              onPaused={(e) => {
                console.log(e);
              }}
              onAnimate={(e) => {
                console.log(e);
              }}
              onTimeUpdate={(e) => {
                console.log(e);
              }}
              onIteration={(e) => {
                console.log(e);
              }}
              onEnded={(e) => {
                console.log(e);
              }}
              className="min-h-screen"
            >
              <div class="container h-[calc(100vh-110px)] relative z-10">
                <div className="absolute bottom-[calc(12vh)] left-[calc(50%)]">
                  {bambooX.map((x, i) => {
                    return (
                      <BambooRender
                        offset={i % 6}
                        x={x}
                        xoffset={Math.floor(i / 6)}
                      ></BambooRender>
                    );
                  })}

                  <div class="panda">
                    <div class="body">
                      <div class="arm left">
                        <div class="forearm">
                          <div class="hand"></div>
                        </div>
                      </div>
                      <div class="leg left">
                        <div class="foot"></div>
                      </div>
                      <div class="belly"></div>
                      <div class="leg right">
                        <div class="foot"></div>
                      </div>
                      <div class="head">
                        <div class="ear left"></div>
                        <div class="ear right"></div>
                        <div class="cheek right"></div>
                        <div class="face">
                          <div class="eye left"></div>
                          <div class="eye right"></div>
                        </div>
                      </div>
                      <div class="arm right">
                        <div class="forearm">
                          <div class="hand">
                            <div class="bamboo joint2">
                              <div class="joint"></div>
                              <div class="joint"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="head front">
                        <div class="mouth"></div>
                        <div class="nose">
                          <div class="mustache left"></div>
                          <div class="mustache right"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Scene>
          ) : (
            <div className="relative h-[calc(100vh-115px)]">
              <img
                src={"../../../public/deadpanda.png"}
                className="absolute left-[calc(50%)] bottom-[60px] w-[calc(50%)] translate-x-[calc(-50%)]"
                alt=""
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
