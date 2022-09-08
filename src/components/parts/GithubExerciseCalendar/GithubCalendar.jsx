import { Divider, Modal, Stack, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import ReactTooltip from "react-tooltip";
import "./style.css";

export const GithubCalendar = ({ log, values }) => {
  const date = new Date();
  // const [hover, setRef] = useHover();
  const startDate = date.setFullYear(date.getFullYear() - 1);
  const [open, setOpen] = useState(false);
  const [modalValue, setModalValue] = useState();
  const [logDate, setDate] = useState();
  return (
    <>
      <Modal
        opened={open}
        onClose={() => {
          setOpen(false);
        }}
        size="lg"
      >
        <Text className="m-3">{logDate && logDate}</Text>
        <Divider />
        <Stack className="m-1">
          {modalValue &&
            modalValue.map((e) => (
              <>
                <Text>
                  {e.do}:{e.mets} {e.time}時間
                </Text>
              </>
            ))}
        </Stack>
      </Modal>
      <div className="container">
        <h1 className="font-mono">運動コントリビューション</h1>
        <div>
          <CalendarHeatmap
            // ここでfirestoreからデートを取得して当てる
            startDate={new Date(startDate)}
            endDate={new Date()}
            // countの数でスタイルの色を変えている
            values={values || [{ date: "", count: "" }]}
            // color
            classForValue={(value) => {
              if (!value) {
                return "color-empty";
              }
              return `color-scale-${value.count}`;
            }}
            tooltipDataAttrs={(value) => {
              if (!value.date) {
                return null;
              }
              // react-tooltipの構成
              return {
                "data-tip": `${value.date} has ${value.count} mets `,
              };
            }}
            onClick={(value) => {
              value && setOpen(true);
              value && setModalValue(log[value.date]);
              value && setDate(value.date);
            }}
          />
        </div>
        <ReactTooltip />
      </div>
    </>
  );
};
