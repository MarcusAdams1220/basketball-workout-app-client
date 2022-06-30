import { useState, useEffect } from 'react'
import Drills from './Drills'

export default function Home() {
  const [skills, setSkills] = useState(Array)
  const [drills, setDrills] = useState(Array)

  useEffect(() => {
    console.log(drills)
  }, [drills])

  const handleToggle = (event:any) => {
    const skill = event.target.name
    const checked = event.target.checked
    if (checked) {
      setSkills(prevState => [...prevState, skill])
    } else if (!checked) {
      setSkills(skills.filter(s => s !== skill))
    }
  }

  const handleSubmit = (event:any) => {
    event.preventDefault()
    skills.forEach(skill => {
      fetch(`/api/drills/${skill}`)
      .then(res =>res.json())
      .then(drillResults => setDrills(prevDrills => prevDrills.concat(drillResults)))
    })
  }

  if (drills.length === 0) {
    return (
      <>
        <div className='skills'>
          <h1>Create A Custom Workout</h1>
          
          <form onSubmit={handleSubmit}>
            <label htmlFor="">Skills: </label>
            <input type="checkbox" name="shooting" onChange={handleToggle}/> Shooting
            <input type="checkbox" name="ball handling" onChange={handleToggle}/> Ball Handling
            <input type="checkbox" name="finishing" onChange={handleToggle}/> Finishing
            <br />
            <label htmlFor="">Duration: </label>
            <select name="" id="">
              <option value="15">15 Minutes</option>
              <option value="30">30 Minutes</option>
              <option value="60">60 Minutes</option>
            </select>
            <button>Select Skills</button>
          </form>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className='skills'>
          <Drills
            drills={drills}
          />
        </div>
      </>
    )
  }
}