"use client"
import * as React from 'react';
import { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import {db} from './firebase';


export default function RegistrationForm() {

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [timeslot, setTimeSlot] = useState("");

    
  // const [formSuccess, setFormSuccess] = useState(false)
  // const [formSuccessMessage, setFormSuccessMessage] = useState("")

  const submitForm = async (e) => {
    // We don't want the page to refresh
    e.preventDefault()
   
    console.log(fullname);
    
    try {
      const docRef = await addDoc(collection(db, "users"), {
        name: fullname,
        email: email,
        phone: phone,
        timeslot:timeslot
      });

      alert("User inserted sucessfully");
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    const res = await fetch("/api/sendgrid", {
      body: JSON.stringify({
        email: email,
        fullname: fullname,
        phone: phone,
        timeslot: timeslot,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const { error } = await res.json();
    if (error) {
      console.log(error);
      return;
    }
  console.log(fullname, email);
  
  }

  return (
      <main className="flex w-full min-h-screen flex-col justify-center">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">WAM HORIZONS</h2>
      </div>
        <div className="flex w-full mb-4">
        <div className="w-1/2 mt-10 sm:mx-auto sm:w-full sm:max-w-sm text-left place-content-start">
    <form className="space-y-6" action="/api/submit/" method="POST"  onSubmit={submitForm}>
    <div>
      <div className='flex'>
        <label for="name" className="w-1/2 block text-sm font-medium leading-6 text-gray-900">Full Name</label>
        <label for="name" className="w-1/2 block text-sm font-medium leading-6 text-gray-900 text-right">الاسم الكامل</label>
      </div>
        
        <div className="mt-2">
          <input id="name" value={fullname}
            onChange={(e) => {
              setFullname(e.target.value);
            }}
             name="name" type="name" autoComplete="name" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
      <div>
        <div className='flex'>
        <label for="name" className="w-1/2 block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
        <label for="name" className="w-1/2 block text-sm font-medium leading-6 text-gray-900 text-right">رقم التليفون</label>
      </div>
        <div className="mt-2">
          <input id="phone" name="phone" value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
             type="phone" autoComplete="phone" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
      <div>
      <div className='flex'>
        <label for="name" className="w-1/2 block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <label for="name" className="w-1/2 block text-sm font-medium leading-6 text-gray-900 text-right">عنوان البريد الإلكتروني</label>
      </div>
        <div className="mt-2">
          <input id="email" name="email" type="email" value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
             autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
      <div>
        
        <div className='flex'>
        <label for="name" className="w-1/2 block text-sm font-medium leading-6 text-gray-900">Time Slot</label>
        <label for="name" className="w-1/2 block text-sm font-medium leading-6 text-gray-900 text-right">فسحة زمنية</label>
      </div>
        <div className="mt-2">
        <select id="timeslot" name='timeslot' value={timeslot}
            onChange={(e) => {
              setTimeSlot(e.target.value);
            }} 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option defaultValue>SelectTime Slot</option>
            <option value="09:00-09:05">09:00-09:05</option>
            <option value="09:05-09:10">09:05-09:10</option>
            <option value="09:10-09:15">09:10-09:15</option>
            <option value="09:15-09:20">09:15-09:20</option>
          </select>
        </div>
      </div>
   <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">SUBMIT</button>
      </div>
    </form>
  
  </div>
  
</div>
      

  

  
</div>
      </main>
    )
  }
  