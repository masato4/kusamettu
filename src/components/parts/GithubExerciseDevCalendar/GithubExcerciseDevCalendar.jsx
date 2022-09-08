import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import ReactTooltip from "react-tooltip";
import "./style.css";


export const GithubExcerciseDevCalendar = () => {
  return (
    <>
    <div className="container">
    <h1 className="font-mono">運動+開発コントリビューション</h1>
    <div>
      <CalendarHeatmap
      // ここでfirestoreからデートを取得して当てる
        startDate={new Date("2022-01-01")}
        endDate={new Date("2023-01-01")}

        // countの数でスタイルの色を変えている
        values={[
          { date: "2022-07-03", count: 1 },
          { date: "2022-08-22", count: 2 },
          { date: "2022-07-29", count: 4 },
          { date: '2022-10-01', count: 1 },
     
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
            "data-tip": `${value.date} has count: ${value.count}`,
          };
        }}
      />
    </div>
    <ReactTooltip />
  </div>
  </>
  )

  
  
}