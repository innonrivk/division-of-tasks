import { useState } from 'react'
import MainRouter from './Route/MainRouter.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <MainRouter></MainRouter>
    </>
  )
}

export default App
