
export default function UserInputs({user,onChange}){
 return(<div className="space-y-4"><h2 className="text-lg font-medium">Körperdaten (optional)</h2>
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
   <label className="flex flex-col"><span>Max. Puls</span>
    <input type="number" className="border rounded px-2 py-1" value={user.hrMax??''}
     onChange={e=>onChange({...user,hrMax:+e.target.value})}/></label>
   <label className="flex flex-col"><span>Gewicht (kg)</span>
    <input type="number" className="border rounded px-2 py-1" value={user.weight??''}
     onChange={e=>onChange({...user,weight:+e.target.value})}/></label>
   <label className="flex flex-col"><span>Geschlecht</span>
    <select className="border rounded px-2 py-1" value={user.gender}
     onChange={e=>onChange({...user,gender:e.target.value})}>
      <option value="male">männlich</option><option value="female">weiblich</option><option value="other">divers</option>
    </select></label>
  </div></div>)
}
