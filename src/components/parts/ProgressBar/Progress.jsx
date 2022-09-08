import { CommitProgress } from "../CommitProgressMessage/CommitProgress";


export const Progress = (props) => {
  
  return (
    <>
    <CommitProgress message={"コミット中"}/>
    <progress color="lime" className="progress progress-success w-56" value={props.value} max="100"></progress>
    </>
  )
}