import ReactPlayer from 'react-player';

interface DrillsProps {
  drills: any;
  duration: number;
}

export default function Drills( { drills, duration }:DrillsProps ) {
  // Shuffles the drills array & returns from index 0 to the numOfDrills
  // const getRandomDrills = (drillsArr:any, numOfDrills:number) => {
  //   const shuffled = [...drills].sort(() => 0.5 - Math.random());
  //   return shuffled.slice(0, numOfDrills);
  // }
  // const workout = getRandomDrills(drills, (duration/5))

  return (
    <div>
      <h1>Drills</h1>
      {drills.map((drill:any, key:number) => 
        <>
          <ReactPlayer key={key} url={drill.video_url} controls/>
          <h2>Drill: {drill.title}</h2>
          <p><strong>Reps:</strong> {drill.instructions}</p>
        </>
        )}
    </div>
  )
}

