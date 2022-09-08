import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import ReactTooltip from "react-tooltip";
import "./style.css";

export const GithubCalendar = ({ values }) => {
  const date = new Date();
  const startDate = date.setFullYear(date.getFullYear() - 1);
  // const endDate = date.setFullYear(date.getFullYear() + 1);
  console.log(values);
  return (
    <>
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
              if (!value || !value.date) {
                return null;
              }
              // react-tooltipの構成
              return {
                "data-tip": `${value.date} has count: ${value.count}\nカロリー:2`,
              };
            }}
          />
        </div>
        <ReactTooltip />
      </div>
    </>
  );
};
