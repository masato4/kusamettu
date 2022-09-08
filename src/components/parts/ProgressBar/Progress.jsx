export const Progress = (props) => {
  
  return (
    <progress className="progress progress-error w-56" value={props.value} max="100"></progress>
  )
}