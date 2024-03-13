import Map from './mapComponent'
import './App.css'


function App() {

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Map  />
      <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
        <img src="https://img.freepik.com/premium-vector/map-logo-location-vector_607588-10365.jpg" alt="Mapbox logo" style={{ width: '100px' }} />
      </div>
    </div>
  )
}

export default App
