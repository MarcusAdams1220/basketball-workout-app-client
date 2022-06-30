import ReactPlayer from 'react-player';

interface DrillsProps {
  drills: any;
}

export default function Drills( { drills }:DrillsProps ) {
  const  getMultipleRandom = (arr:any, num:number) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
  
    return shuffled.slice(0, num);
  }
  const randomDrills = getMultipleRandom(drills, 6)
  
  return (
    <div>
      <h1>Drills</h1>
      {randomDrills.map((drill:any, key:number) => 
        <>
          <ReactPlayer key={key} url={drill.video_url} controls/>
          <h2>Drill: {drill.title}</h2>
          <p><strong>Reps:</strong> {drill.instructions}</p>
        </>
        )}
    </div>
  )
}

