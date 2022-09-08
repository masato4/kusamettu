import { CommitProgress } from "../CommitProgressMessage/CommitProgress";

export const Progress = (props) => {
  return (
    <>
      {props.textVisible ? (
        <CommitProgress message={props.statusMessage} />
      ) : (
        ""
      )}
      {props.progressVisible ? (
        <progress
          color="lime"
          className="progress progress-success w-56"
          value={props.value}
          max="100"
        />
      ) : (
        ""
      )}
    </>
  );
};
