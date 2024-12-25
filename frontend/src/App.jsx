import { useState } from 'react'
import MainRouter from './Route/MainRouter.tsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <MainRouter></MainRouter>
    </>
  )
}

export default App
