'use client'
// dashboard
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { fetchuser, updateprofile } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
  const { data: session, update } = useSession()
  const router = useRouter();
  const [form, setform] = useState({ name: "", Email: "", profilepicture: "", coverpicture: "", razorpayid: "", razorpaysecret: "" })

  useEffect(() => {
    document.title = 'Dashboard - Get me a chai'
  }, [])


  useEffect(() => {

    if (!session) {
      router.push("/login")
    } else {
      getdata()
    }


  }, [router, session])

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }


  const handleSubmit = async (element) => {
if(form.razorpayid.length != 0 || form.razorpaysecret.length != 0){
  await updateprofile(element, session.user.name)
  update()
  router.push(`/${session.user.name}`)
}
else{
  alert("Set RazorpayID and RazorpaySecret")
}
    //  not using toast because it cause errors

    // toast("Profile updated", {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",
    // });
  }

  const getdata = async () => {

    let u = await fetchuser(session.user.name)

    if (u) {

      setform({ ...form, Email: u.Email, name: u.name })

    }
  }


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />


      <div className=' md:w-[40%]  md:m-auto py-5 flex flex-col justify-center items-center'>
        <h2 className='font-bold text-2xl'>Welcome to your Dashboard</h2>
        <form className='w-full' action={handleSubmit}>
          <div className="inputs flex flex-col w-full px-5 ">

            <label htmlFor="name">Name</label>
            <input onChange={handlechange} value={form.name} className='bg-[#0f172a] border border-white text-white px-2 py-1 rounded-md mb-3' type="text" name="name" id="name" placeholder='Enter name' />

            <label htmlFor="Email">Email</label>
            <input onChange={handlechange} value={form.Email} className='bg-[#0f172a] border border-white text-white px-2 py-1 rounded-md mb-3 ' type="email" name="Email" id="Email" placeholder='Enter email' />

            <label htmlFor="profilepicture">Profile picture</label>
            <input onChange={handlechange} value={form.profilepicture} className='bg-[#0f172a] border border-white text-white px-2 py-1 rounded-md mb-3' type="text" name="profilepicture" id="profilepicture" placeholder='Enter Profile picture link' />

            <label htmlFor="coverpicture">Cover picture</label>
            <input onChange={handlechange} value={form.coverpicture} className='bg-[#0f172a] border border-white text-white px-2 py-1 rounded-md mb-3' type="text" name="coverpicture" id="coverpicture" placeholder='Enter Profile Cover link' />

            <label htmlFor="razorpayid">Razorpay Id &#42;</label>
            <input onChange={handlechange} value={form.razorpayid} className='bg-[#0f172a] border border-white text-white px-2 py-1 rounded-md mb-3' type="text" name="razorpayid" id="razorpayid" placeholder='Enter Razorpay Id ' />

            <label htmlFor="razorpaysecret">Razorpay Secret &#42;</label>
            <input onChange={handlechange} value={form.razorpaysecret} className='bg-[#0f172a] border border-white text-white px-2 py-1 rounded-md mb-3' type="text" name="razorpaysecret" id="razorpaysecret" placeholder='Enter Razorpay Secret' />

            <button type="submit" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3 mb-2">Save</button>
          </div>
        </form>
      </div>
    </>

  )
}

export default Page
