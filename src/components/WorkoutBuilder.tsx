import { useState } from 'react'
import Workout from './Workout'
import { Form } from 'react-bootstrap';

interface BuilderProp {
  setLoggedIn: (state:boolean) => void;
}

export default function WorkoutBuilder({setLoggedIn}:BuilderProp) {
  setLoggedIn(true)
  const [skills, setSkills] = useState(Array)
  const [drills, setDrills] = useState(Array)
  const [duration, setDuration] = useState(15)

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
    fetch(`/api/drills/${skills.join('-')}-${duration}`)
      .then(res =>res.json())
      .then(drillResults => setDrills(prevDrills => prevDrills.concat(drillResults)))
  }

  const handleSelect = (event:any) => {
    const selectedDuration = event.target.value
    setDuration(selectedDuration)
  }

  if (drills.length === 0) {
    return (
      <>
        <div className='workout-builder'>
          <h1>Workout Builder</h1>
          <h2>Which Skills Do You Want To Work On?</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Check 
              type="checkbox"
              label="Shooting"
              name="shooting"
              onChange={handleToggle}
              className="skill-checkbox"
            />
            <Form.Check 
              type="checkbox"
              label="Finishing"
              name="finishing"
              onChange={handleToggle}
              className="skill-checkbox"
            />
            <Form.Check 
              type="checkbox"
              label="Ball Handling"
              name="ball handling"
              onChange={handleToggle}
              className="skill-checkbox"
            />
            <hr className='divider' />
            <h2>How Much Time Do You Have?</h2>
            <Form.Check 
              type="radio"
              name="duration"
              label="15 Minutes"
              value='15'
              onChange={handleSelect}
              className="duration-select"
              required
            />
            <Form.Check 
              type="radio"
              name="duration"
              label="30 Minutes"
              value='30'
              onChange={handleSelect}
              className="duration-select"
            />
            <Form.Check 
              type="radio"
              name="duration"
              label="60 Minutes"
              value='60'
              onChange={handleSelect}
              className="duration-select"
            />
            <br />
            <button type="submit" className='glow-on-hover'>Create Workout</button>
            <p className='effect-msg'>(Click & Hold For Effect)</p>
          </Form>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div>
          <Workout
            drills={drills}
            duration={duration}
          />
        </div>
      </>
    )
  }
}