import './App.css'
import apiCall from './apiCall'

function App() {

  async function api(){
    const characters = await apiCall()
    return characters
  }

  console.log(api())

  return (
    <>
     <div className='container'>
        <div className='marvel-caracter'>

        </div>
        <div className='marvel-caracter'>
          
        </div>
     </div>
    </>
  )
}

export default App
