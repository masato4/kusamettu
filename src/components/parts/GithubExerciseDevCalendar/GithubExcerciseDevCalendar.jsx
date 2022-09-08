import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import ReactTooltip from "react-tooltip";
import "./style.css";
import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";

const FETCH_CONTRIBUTION = gql`
  query ($userName: String!) {
    user(login: $userName) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

export const GithubExcerciseDevCalendar = ({ userName }) => {
  const date = new Date();
  // const [hover, setRef] = useHover();
  const startDate = date.setFullYear(date.getFullYear() - 1);
  const { loading, error, data } = useQuery(FETCH_CONTRIBUTION, {
    variables: { userName: userName },
  });
  const [valueData, setValue] = useState();
  useEffect(() => {
    const contribute = [];
    data &&
      data.user.contributionsCollection.contributionCalendar.weeks.map((e) => {
        e.contributionDays.map((v) => {
          contribute.push(v);
        });
      });
    setValue(contribute);
  }, [data]);
  data && console.log(valueData);
  return (
    <>
      <div>
        <div>
          <CalendarHeatmap
            // ここでfirestoreからデートを取得して当てる
            startDate={new Date(startDate)}
            endDate={new Date()}
            // countの数でスタイルの色を変えている
            values={valueData || [{}]}
            // color
            classForValue={(value) => {
              if (!value) {
                return "color-empty";
              }
              return `color-scale-${value.contributionCount}`;
            }}
            tooltipDataAttrs={(value) => {
              if (!value || !value.date) {
                return null;
              }
              // react-tooltipの構成
              return {
                "data-tip": `${value.date} has count: ${value.contributionCount}`,
              };
            }}
          />
        </div>
        <ReactTooltip />
      </div>
    </>
  );
};
