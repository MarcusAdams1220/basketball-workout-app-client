import ReactPlayer from 'react-player';

interface BuilderProps {
  drills: Array<any>;
  duration: number;
}

export default function Workout( { drills, duration }:BuilderProps ) {
  return (
    <div>
      <h1>Custom {duration} Minute Workout</h1>
      {drills.map((drill:any, key:number) => 
        <div key={key} className="drill">
          <ReactPlayer url={drill.video_url} controls/>
          <h2>{drill.title}</h2>
          <p><strong>Instructions:</strong> {drill.instructions}</p>
        </div>
        )}
    </div>
  )
}