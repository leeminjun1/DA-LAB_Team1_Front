import { Routes, Route } from 'react-router-dom'
// import ReceiverMain from './pages/ReceiverMain'
import GiverMain from './pages/GiverMain'
// import LookBook from './pages/LookBook'
import GroupCreate from './pages/GroupCreate'
import GiverStatistics from './pages/GiverStatistics'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<GiverMain />} />
        <Route path="/giver-main" element={<GiverMain />} />
        <Route path="/groupcreate" element={<GroupCreate />} />
        <Route path='/groupstatistics' element={<GiverStatistics />}/>
        {/* <Route path='/look-book' element={<LookBook />} /> */}
      </Routes>
    </>
  )
}

export default App