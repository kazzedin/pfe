import React,{useState} from 'react'
import axios from 'axios'

export default function Contact() {
  const [inputs,setInputs]=useState({})

const HandelEnvoyer=(e)=>{
e.preventDefault()
axios.post('http://localhost:3001/Admin/contact',{email:inputs.email,message:inputs.message})
.then(res=>console.log(res))
.catch(err=>console.log(err))
  }

  const HandelInputs=(e)=>{
 const name=e.target.name
 const value=e.target.value
 setInputs(values=>({...values, [name]:value}))
  }

  return (
    <form className="mt-4" onSubmit={HandelEnvoyer}>
    <div className="mb-4">
      <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email :</label>
      <input type="text" id="email" name="email" className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" placeholder="Entrez votre email" value={inputs.email} onChange={HandelInputs} />
    </div>
    <div className="mb-4">
      <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message :</label>
      <textarea id="message" name="message" className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" placeholder="Entrez votre message ici" rows="4" value={inputs.message} onChange={HandelInputs}></textarea>
    </div>
    <button type='submit' className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Envoyer</button>
  </form>
  )
}
