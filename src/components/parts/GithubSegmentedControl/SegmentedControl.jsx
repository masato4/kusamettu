
import { SegmentedControl } from '@mantine/core';
import { useState } from 'react';
import { GithubCalendar } from '../GithubExerciseCalendar/GithubCalendar';
import { GithubExcerciseDevCalendar } from '../GithubExerciseDevCalendar/GithubExcerciseDevCalendar';


export const Segmented = ({ values, log }) => {
  const [value, setValue] = useState("react");
  return (
    <div>
      <SegmentedControl
        data={[
          { label: "運動コントリビューション", value: "react" },
          { label: "運動+開発コントリビューション", value: "ng" },
        ]}
        value={value}
        onChange={setValue}
      />
      {value === "react" ? <GithubCalendar log={log} values={values} /> : <><GithubExcerciseDevCalendar /></>}

    </div>
  );
};
