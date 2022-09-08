import { SegmentedControl, Stack } from "@mantine/core";
import { useState } from "react";
import { GithubCalendar } from "../GithubExerciseCalendar/GithubCalendar";
import { GithubExcerciseDevCalendar } from "../GithubExerciseDevCalendar/GithubExcerciseDevCalendar";

export const Segmented = ({ values, log, userName }) => {
  const [value, setValue] = useState("react");
  return (
    <Stack>
      <SegmentedControl
        data={[
          { label: "運動の草", value: "react" },
          { label: "GitHubの草", value: "ng" },
        ]}
        value={value}
        onChange={setValue}
      />
      {value === "react" ? (
        <GithubCalendar log={log} values={values} />
      ) : (
        <>
          <GithubExcerciseDevCalendar userName={userName} />
        </>
      )}
    </Stack>
  );
};
