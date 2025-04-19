import { Toaster } from 'react-hot-toast'
import DataStructureVisualizer from './components/DataStructureVisualizer'
import './App.css'

function App() {
  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
      <DataStructureVisualizer />
    </>
  )
}

export default App
