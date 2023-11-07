"use client"
import * as React from 'react';
import { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import {db} from './firebase';


export default function RegistrationForm() {

    // const [fname, setName] = useState('Amjad');
    // console.log(fname);

    // const setnameValue=(event)=>{
    //   const newVal = event.target.value;
    //   setName(newVal);
    // }
    const [formData, setFormData] = useState({
      name: "",
      phone: "",
      email: ""
    });

    const [formSuccess, setFormSuccess] = useState(false)
  const [formSuccessMessage, setFormSuccessMessage] = useState("")

  const handleInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    //console.log(fieldName+'---'+fieldValue)
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
  }
  const submitForm = async (e) => {
    // We don't want the page to refresh
    e.preventDefault()

    

    const formURL = e.target.action
    const data = new FormData()
    let name = '';
    let email = '';
    let phone = '';

    // Turn our formData state into data we can use with a form submission
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    })

    //console.log(data.entries());
    //const =  name, email, phone;
    for (const pair of data.entries()) {

      //console.log(`${pair[0]}, ${pair[1]}`);

      if(`${pair[0]}` === 'name')
      {
        name = `${pair[1]}`;
      }
      if(`${pair[0]}` === 'email')
      {
        email = `${pair[1]}`;
      }
      if(`${pair[0]}` === 'phone')
      {
        phone = `${pair[1]}`;
      }

    }
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: name,
        last: email,
        born: phone
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    const testVar = {"name":name,'emial':email,'phone':phone}
    console.log(testVar);
     // POST the data to the URL of the form
    fetch(formURL, {
      method: "POST",
      body: JSON.stringify(testVar),
      headers: {
        'accept': 'application/json',
      },
    }).then((response) => response.json())
    .then((data) => {
      setFormData({ 
        name: "", 
        email: "", 
        message: "" 
      })
      //alert(data);
      setFormSuccess(true)
      setFormSuccessMessage(data.submission_text)
    })
  }

  return (
      <main className="flex w-full min-h-screen flex-col justify-center">
        <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">WAM HORIZONS</h2>
      </div>
        <div class="flex w-full mb-4">
        <div class="w-1/2 mt-10 sm:mx-auto sm:w-full sm:max-w-sm text-left place-content-start">
    <form class="space-y-6" action="/api/submit/" method="POST"  onSubmit={submitForm}>
    <div>
      <div className='flex'>
        <label for="name" class="w-1/2 block text-sm font-medium leading-6 text-gray-900">Full Name</label>
        <label for="name" class="w-1/2 block text-sm font-medium leading-6 text-gray-900 text-right">الاسم الكامل</label>
      </div>
        
        <div class="mt-2">
          <input id="name" onChange={handleInput} value={formData.name} name="name" type="name" autocomplete="name" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
      <div>
        <div className='flex'>
        <label for="name" class="w-1/2 block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
        <label for="name" class="w-1/2 block text-sm font-medium leading-6 text-gray-900 text-right">رقم التليفون</label>
      </div>
        <div class="mt-2">
          <input id="phone" name="phone" onChange={handleInput} value={formData.phone} type="phone" autocomplete="phone" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
      <div>
      <div className='flex'>
        <label for="name" class="w-1/2 block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <label for="name" class="w-1/2 block text-sm font-medium leading-6 text-gray-900 text-right">عنوان البريد الإلكتروني</label>
      </div>
        <div class="mt-2">
          <input id="email" name="email" type="email" onChange={handleInput} value={formData.email} autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
      <div>
        
        <div className='flex'>
        <label for="name" class="w-1/2 block text-sm font-medium leading-6 text-gray-900">Time Slot</label>
        <label for="name" class="w-1/2 block text-sm font-medium leading-6 text-gray-900 text-right">فسحة زمنية</label>
      </div>
        <div class="mt-2">
          
        </div>
      </div>
   <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">SUBMIT</button>
      </div>
    </form>
  
  </div>
  
</div>
      

  

  
</div>
      </main>
    )
  }
  