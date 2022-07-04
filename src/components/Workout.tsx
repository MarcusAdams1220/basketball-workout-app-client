import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom'

interface BuilderProps {
  drills: Array<any>;
  duration: number;
}

export default function Workout( { drills, duration }:BuilderProps ) {
  const navigate = useNavigate()

  const saveWorkout = (event:any) => {
    event.preventDefault()
    fetch(`/workout/${duration}`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(drills)
    })
    navigate('/profile')
  }

  return (
    <>
      <div className='workout'>
        <h1>Here's Your {duration} Minute Workout!</h1>
        {drills.map((drill:any, key:number) => 
          <div key={key} className="drill">
            <ReactPlayer url={drill.video_url} controls className="drill-video"/>
            <h3>({drill.category[0].toUpperCase() + drill.category.slice(1)} Drill)</h3>
            <h2>{drill.title}</h2>
            <p><strong>Instructions:</strong> {drill.instructions}</p>
            <hr />
          </div>
          )}
          <button onClick={saveWorkout}>Mark As Complete</button>
      </div>
    </>
  )
}