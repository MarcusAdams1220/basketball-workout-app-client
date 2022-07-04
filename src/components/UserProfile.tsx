import { useEffect, useState } from 'react'

export default function UserProfile() {
  const [numOfWorkouts, setNumOfWorkouts] = useState(Number)
  const [durationOfAllWorkouts, setDurationOfAllWorkouts] = useState(Number)

  const hoursSpentTraining = Math.floor(durationOfAllWorkouts / 60)
  const minsSpentTraining = durationOfAllWorkouts % 60
  let ranking = ""

  if (hoursSpentTraining < 30) {
    ranking = 'Rookie'
  } else if (hoursSpentTraining < 90) {
    ranking = 'Starter'
  } else if (hoursSpentTraining < 180) {
    ranking = 'All-Star'
  } else if (hoursSpentTraining < 360) {
    ranking = 'Hall Of Famer'
  }

  const userId = window.localStorage.getItem('userId')
  const userName = window.localStorage.getItem('userName')

  useEffect(() => {
    fetch(`/user/${userId}`)
    .then(res => res.json())
    .then(drills => {
      const workoutIds = drills.map((drill:any) => drill.workout_id)
      const uniqueIds = new Set(workoutIds)
      setNumOfWorkouts(uniqueIds.size)

      let durations:any = []
      drills.forEach((drill:any) => {
        if (!durations.includes(drill.workout_duration)) {
          durations.push(drill.workout_duration)
        }
      })
      const sumOfWorkoutDurations = durations.reduce((total:number, duration:number) => {
        return total += duration
      }, 0)
      setDurationOfAllWorkouts(sumOfWorkoutDurations)
      })
  }, [])

  return (
    <div className='profile' style={{marginTop: '100px'}}>
      <h1 style={{color: 'white'}}>{userName}'s Profile</h1>
      <h2 style={{color: 'white'}}>Workouts Completed: {numOfWorkouts}</h2>
      <h2 style={{color: 'white'}}>Time Spent Training: {hoursSpentTraining} hours & {minsSpentTraining} mins</h2>
      <h2 style={{color: 'white'}}>Ranking: {ranking}</h2>
      <br />
      
      <ul style={{listStyle: 'none'}}>
        <p style={{color: 'white'}}>Rankings:</p>
        <li style={{color: 'white'}}>Less Than 30 Hours Spent Training = Rookie</li>
        <li style={{color: 'white'}}>30-60 Hours Spent Training = Starter</li>
        <li style={{color: 'white'}}>60-180 Hours Spent Training = All-Star</li>
        <li style={{color: 'white'}}>360+ Hours Spent Training = All-Star</li>
      </ul>
    </div>
  )
}