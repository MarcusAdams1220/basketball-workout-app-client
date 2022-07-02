import { useState } from 'react'
import Workout from './Workout'
import { Button, Form, FloatingLabel } from 'react-bootstrap';

export default function WorkoutBuilder() {
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
        <div className='skills'>
          <h2>Custom Workout Builder</h2>
          <p>Select The Skills You Want To Work On</p>
          <Form onSubmit={handleSubmit}>
            <Form.Check 
              type="checkbox"
              label="Shooting"
              name="shooting"
              onChange={handleToggle}
            />
            <Form.Check 
              type="checkbox"
              label="Finishing"
              name="finishing"
              onChange={handleToggle}
            />
            <Form.Check 
              type="checkbox"
              label="Ball Handling"
              name="ball handling"
              onChange={handleToggle}
            />
            <FloatingLabel controlId="floatingSelect" label="Workout Duration">
              <Form.Select aria-label="Floating label select example" onChange={handleSelect} className="duration-select">
                <option value="15">15 Minutes</option>
                <option value="30">30 Minutes</option>
                <option value="60">60 Minutes</option>
              </Form.Select>
            </FloatingLabel>
            <Button type="submit">Create Workout</Button>
          </Form>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className='skills'>
          <Workout
            drills={drills}
            duration={duration}
          />
        </div>
      </>
    )
  }
}