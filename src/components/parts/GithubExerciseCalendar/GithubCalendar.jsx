import { Divider, Modal, Stack, Table, Text } from "@mantine/core";
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
        <Table>
          <thead>
            <tr>
              <th>運動</th>
              <th>mets</th>
              <th>時間</th>
            </tr>
          </thead>
          <tbody>
            {modalValue &&
              modalValue.map((e) => (
                <tr>
                  <td>{e.do}</td>
                  <td>{e.mets}</td>
                  <td>{e.time}</td>
                </tr>
              ))}
          </tbody>
        </Table>
        <Stack className="m-1"></Stack>
      </Modal>
      <div>
        <>
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
        </>
        <ReactTooltip />
      </div>
    </>
  );
};
