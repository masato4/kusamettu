import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import ReactTooltip from "react-tooltip";
import "./style.css";

export const GithubCalendar = () => {
  return (
    <>
      <div className="container">
      <h1 className="font-mono">運動コントリビューション</h1>
      <div>
        <CalendarHeatmap
        // ここでfirestoreからデートを取得して当てる
          startDate={new Date("2015-12-01")}
          endDate={new Date("2016-12-01")}

          // countの数でスタイルの色を変えている
          values={[
            { date: "2016-07-03", count: 1 },
            { date: "2016-08-22", count: 2 },
            { date: "2016-07-29", count: 4 },
            { date: '2016-10-01', count: 1 },
            { date: '2016-10-03', count: 2 },
            { date: '2016-10-06', count: 3 },
            { date: '2016-10-10', count: 4 },
            { date: '2016-10-07', count: 1 },
            { date: '2016-09-15', count: 3 },
            { date: '2016-09-18', count: 3 },
            { date: '2016-09-19', count: 3 },
            { date: '2016-09-20', count: 6 },
            // ...and so on
          ]}

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
  )
}