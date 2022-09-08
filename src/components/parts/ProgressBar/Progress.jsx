import { CommitProgress } from "../CommitProgressMessage/CommitProgress";


export const Progress = (props) => {
  
  return (
    <>
    <CommitProgress message={"コミット中"}/>
    <progress className="progress progress-error w-56" value={props.value} max="100"></progress>
    </>
  )
}