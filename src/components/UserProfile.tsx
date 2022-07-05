import { useEffect, useState } from 'react'

interface ProfileProp {
  setLoggedIn: (state:boolean) => void;
  loggedIn: any
}


export default function UserProfile({setLoggedIn, loggedIn}:ProfileProp) {
  // setLoggedIn(true)
  const [numOfWorkouts, setNumOfWorkouts] = useState(Number)
  const [durationOfAllWorkouts, setDurationOfAllWorkouts] = useState(Number)
  const userId = window.localStorage.getItem('userId')
  const userName = window.localStorage.getItem('userName')

  let hoursSpentTraining = Math.floor(durationOfAllWorkouts / 60)
  let minsSpentTraining = durationOfAllWorkouts % 60
  let level = ""

  if (hoursSpentTraining < 30) {
    level = 'Rookie'
  } else if (hoursSpentTraining < 90) {
    level = 'Starter'
  } else if (hoursSpentTraining < 180) {
    level = 'All-Star'
  } else if (hoursSpentTraining < 360) { 
    level = 'Hall Of Famer'
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
      <h2 style={{color: 'white'}}>Current Level: {level}</h2>
      <br />
      
      <ul style={{listStyle: 'none'}}>
        <h3 style={{color: 'white'}}>Levels:</h3>
        <li style={{color: 'white'}}>0-30 Hours Of Training Time = Rookie</li>
        <li style={{color: 'white'}}>30-60 Hours Of Training Time = Starter</li>
        <li style={{color: 'white'}}>60-180 Hours Of Training Time = All-Star</li>
        <li style={{color: 'white'}}>360+ Hours Of Training Time = Hall Of Famer</li>
      </ul>
    </div>
  )
}