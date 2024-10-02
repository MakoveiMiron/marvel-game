import './App.css'
import apiCall from './apiCall'

function App() {

  async function api(){
    const characters = await apiCall()
    
    console.log("characters", characters)
  }

  api()

  return (
    <>
     <div className='container'>
        <div className='marvel-caracter'>
          <p>asdasdasd</p>
        </div>
        <div className='marvel-caracter'>
          
        </div>
     </div>
    </>
  )
}

export default App
