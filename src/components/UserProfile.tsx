import { useEffect, useState } from 'react'

export default function UserProfile() {
  const [numOfWorkouts, setNumOfWorkouts] = useState(Number)
  const [durationOfAllWorkouts, setDurationOfAllWorkouts] = useState(Number)
  const userId = window.localStorage.getItem('userId')
  const userName = window.localStorage.getItem('userName')

  let hoursSpentTraining = Math.floor(durationOfAllWorkouts / 60)
  let minsSpentTraining = durationOfAllWorkouts % 60
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

  useEffect(() => {
    fetch(`/user/${userId}`)
    .then(res => res.json())
    .then(drills => {
      // Get unique id for each workout
      const workoutIds = drills.map((drill:any) => drill.workout_id)
      const uniqueIds = new Set(workoutIds)
      setNumOfWorkouts(uniqueIds.size)
      // Convert set to array
      const arrOfUniqueIds = Array.from(uniqueIds)
      // Create an object that stores the durations of each workout
      let durations:any = {}
      arrOfUniqueIds.forEach((id:any) => {
        drills.forEach((drill:any) => {
          if (drill.workout_id == id) {
            durations[drill.workout_id] = drill.workout_duration
          }
        })
      })
      // Reduce the object of durations to a sum of all durations
      const arrOfDurations = Object.values(durations)
      const sumOfWorkoutDurations = arrOfDurations.reduce((total:number, currentDuration:any) => {
        return total += currentDuration
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