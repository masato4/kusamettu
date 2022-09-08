import "./styles.css";
import { Scene, SceneItem } from "react-scenejs";
import { BambooRender } from "./BambooRender";
import { useState } from "react";


export function PandaYoko({ diff, calorie }) {
  const [bamboo, setBamboo] = useState([]);
  const [bambooX, setBambooX] = useState([]);
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
  const chengetext = (e) => {
    console.log([...Array(e.target.value)]);
    setBamboo([...Array(parseInt(e.target.value))]);
  };
  const chengetext2 = (e) => {
    console.log([...Array(e.target.value)]);
    const x = Math.floor(parseInt(e.target.value) / 14);
    let aaa = [];
    for (let i = 0; i < x; i++) {
      aaa.push(14);

    }
    aaa.push(parseInt(e.target.value) % 14);
    setBambooX(aaa);
    console.log(aaa);
  };

    return (

        <>
                <div className="relative">
                    <div>                
                        <input type="number" placeholder="Type here" onChange={chengetext2} className="absolute z-30 input input-bordered input-info w-full max-w-xs" />
                        <div className="card absolute w-96 left-[calc(50%)] translate-x-[calc(-50%)] top-[calc(15%)] z-20 bg-base-100 shadow-xl">
                            <div className="grid grid-cols-2 m-5 place-content-center">
                                <span className="text-center z-30">現在:竹140本</span>
                                <span className="text-center z-20">死まであと10時間</span>
                                <span className="text-center z-30">このはちゃん</span>
                                <span className="text-center z-20">20日生存中</span>
                            </div>
                        </div>
                    {bamboo ? 
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
                        onPlay={e => { console.log(e); }}
                        onPaused={e => { console.log(e); }}
                        onAnimate={e => { console.log(e); }}
                        onTimeUpdate={e => { console.log(e); }}
                        onIteration={e => { console.log(e); }}
                        onEnded={e => { console.log(e); }}
                        className="min-h-screen"
                    >
                        {/* <div className="container min-h-[calc(100vh)]">

              {bamboo.map((x, i) =>{
                return <PandaYoko offset={i}></PandaYoko>
              })}
          </div> */}
                        <div class="container h-[calc(100vh-110px)] relative z-10">
                            <div className="absolute bottom-[calc(13%)] left-[calc(50%)]">
                            {bambooX.map((x, i) => {
                                return <BambooRender offset={i%6} x={x} xoffset={Math.floor(i/6)}></BambooRender>
                            })}
                            
                            <div class="panda">
                                <div class="body">
                                    <div class="arm left">
                                        <div class="forearm">
                                            <div class="hand"></div>
                                        </div>
                                    </div>
                                    <div class="leg left"><div class="foot"></div></div>
                                    <div class="belly">
                                    </div>
                                    <div class="leg right"><div class="foot"></div></div>
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
                    : 
                    <div className="relative h-[calc(100vh-115px)]">
                        <img src={"../../../public/deadpanda.png"} className="absolute left-[calc(50%)] bottom-[60px] w-[calc(50%)] translate-x-[calc(-50%)]" alt="" />
                    </div>
                    }
                    </div>
                </div>
    </>
  );
}
