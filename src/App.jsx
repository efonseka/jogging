
import { useState } from 'react'
import UserInputs from './UserInputs'
import RealtimeMetabolism from './RealtimeMetabolism'
export default function App(){
 const [user,setUser]=useState({hrMax:190,gender:'male',weight:70})
 return(<div className="p-6 bg-white rounded-lg shadow space-y-6">
  <h1 className="text-2xl font-semibold">Metabolism Realtime Demo</h1>
  <UserInputs user={user} onChange={setUser}/>
  <RealtimeMetabolism user={user}/>
 </div>)
}
