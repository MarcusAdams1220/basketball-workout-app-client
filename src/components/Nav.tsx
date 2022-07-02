import React, { useEffect } from 'react'

interface SessionProps {
  // Null, then String after login
  loggedIn: any
}

export default function Nav({ loggedIn }:SessionProps) {
  const logout = () => {
    window.localStorage.removeItem('isLoggedIn')
  }

  if (loggedIn === 'true') {
    return (
      <>
        <ul>
          <li><a href="/">Workout Builder</a></li>
          <li><a href="/" onClick={logout}>Logout</a></li>
        </ul>
      </>
    )
  } else {
    return (
      <>
        <ul>
          <li><a href="/sign-up">Sign Up</a></li>
        </ul>
      </>
    )
  }
}
