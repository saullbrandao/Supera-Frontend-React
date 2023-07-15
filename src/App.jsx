import { useEffect, useState } from 'react'
import { StatementTable } from './components/StatementTable/StatementTable'
import { apiURL } from './utils/constants'
import './App.css'

function App() {
  const [statement, setStatement] = useState({})

  const updateStatement = updateStatement => setStatement(updateStatement)

  useEffect(() => {
    fetch(apiURL)
      .then(res => res.json())
      .then(res => updateStatement(res))
  }, [])

  return (
    <main>
      <StatementTable statement={statement} />
    </main>
  )
}

export default App
