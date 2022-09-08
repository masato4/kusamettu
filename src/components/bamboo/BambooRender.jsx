import { useState } from "react"
import { Sasa1 } from "./Sasa1"
import { Sasa2 } from "./Sasa2"
import { Sasa3 } from "./Sasa3"
import { Sasa4 } from "./Sasa4"
import { Sasa5 } from "./Sasa5"
import { Sasa6 } from "./Sasa6"
import { Sasa7 } from "./Sasa7"
import { Sasa8 } from "./Sasa8"
import { Sasa9 } from "./Sasa9"
import { Sasa10 } from "./Sasa10"
import { Sasa11 } from "./Sasa11"
import { Sasa12 } from "./Sasa12"
import { Sasa13 } from "./Sasa13"
import { Sasa14 } from "./Sasa14"


export const BambooRender = (props) => {
    return (
        <>
            <div class={`bamboo joint2 bamboo1 mb-${props.offset * 100}px`}>
                {props.x >= 1 && <Sasa1></Sasa1>}
            </div>
            {/* 下が右の明るグループ */}
            <div class={`bamboo-group bamboo-group1 mb-${props.offset * 100}px`}>
                {props.x >= 5 && <Sasa5></Sasa5>}
                {props.x >= 6 && <Sasa6></Sasa6>}
                {props.x >= 7 && <Sasa7></Sasa7>}
            </div>
            {/* 下がパンダが掴まない左のグループ */}
            <div class={`bamboo-group bamboo-group2 mb-${props.offset * 100}px`}>
                {props.x >= 2 && <Sasa2></Sasa2>}
                {props.x >= 3 && <Sasa3></Sasa3>}
                {props.x >= 4 && <Sasa4></Sasa4>}
            </div>
            {/* 下が右下の暗いグループ */}
            <div class={`bamboo-group bamboo-group3 dark mb-${props.offset * 100}px`}>
                {props.x >= 12 && <Sasa12></Sasa12>}
                {props.x >= 13 && <Sasa13></Sasa13>}
                {props.x >= 14 && <Sasa14></Sasa14>}
            </div>
            {/* 下が左下の暗いグループ */}
            <div class={`bamboo-group bamboo-group4 dark mb-${props.offset * 100}px`}>
                {props.x >= 8 && <Sasa8></Sasa8>}
                {props.x >= 9 && <Sasa9></Sasa9>}
                {props.x >= 10 && <Sasa10></Sasa10>}
                {props.x >= 11 && <Sasa11></Sasa11>}
            </div>
        </>
    )
}