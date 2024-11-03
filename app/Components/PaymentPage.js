"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'
import Script from 'next/script'
import Razorpay from 'razorpay'
import { fetchpayments, fetchuser, initiate } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useRef } from 'react'


const PaymentPage = ({ username }) => {

    const [paymentform, setpaymentform] = useState({})
    const [currentuser, setcurrentuser] = useState({})
    const [currentpayments, setcurrentpayments] = useState([])
    const totalpay = useRef(0)
    const { data: session } = useSession()

    let params = useSearchParams()
    let router = useRouter()

    useEffect(() => {

        if (!session) {
            router.push("/login")
        } else {
            getdata(username)
        }


    }, [router, session])


    useEffect(() => {
        if (params.get("paymentdone") === "true") {
            toast('Payment done', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
            router.push(`/${username}`)
        }


    }, [])




    const handlechange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }


    const pay = async (amount) => {

        let a = await initiate(amount, paymentform, username, false, currentuser)
        let oid = a.id
        console.log(oid);

        var options = {
            "key_id": currentuser.razorpayid,
            "key_secret": currentuser.razorpaysecret,
            "amount": Number.parseInt(amount) * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Buy Me A Chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": oid, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `http://localhost:3000/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                name: 'Harsh Saini',
                email: 'harsh@example.com',
                contact: '9999999999'
            },
            "notes": {
                address: 'Rohtak, Haryana'
            },
            "theme": {
                "color": "#3399cc"
            }
        };

        // here we use window.razorpay to open window
        var rzp1 = new window.Razorpay(options);
        rzp1.open();

    }

    const getdata = async (username) => {

        let u = await fetchuser(username)
        setcurrentuser(u)

        let p = await fetchpayments(username)
        setcurrentpayments(p)

    }

    const gettotal = () => {
        let total = 0
        currentpayments.forEach(element => {
            let amount = Number.parseInt(element.amount)

            total = total + amount

        })

        return total
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

            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className="cont h-[83vh] max-sm:h-[84vh] max-xl:h-[91vh] overflow-y-scroll ">

                <div className="bgimage border-2 border-black h-[25vh] lg:h-[45vh] w-full bg-slate-400 object-contain   overflow-hidden">
                    <img className='  w-full h-full' src={currentuser.coverpicture} alt="backgroundimage" />
                </div>
                <div className="main  text-center bg-white text-black pb-10 ">

                    <div className='profileimg border border-black h-[15vh] rounded-xl w-28 relative max-sm:left-[38%] left-[46%] bottom-[8vh] object-contain   overflow-hidden'>
                        <img className='rounded-xl  w-full h-full' src={currentuser.profilepicture} alt="profilepicture" />
                    </div>

                    <div className='info bottom-10 relative'>
                        <div className="username font-bold text-3xl">{username}</div>
                        <div className="caption text-lg">You can always donate for a Chai</div>
                        <div className='flex justify-center items-center gap-3'>
                            <div className="info text-slate-500">{currentpayments.length} Payments . </div>
                            <div className="info text-slate-500"> ₹{gettotal()} raised</div>
                        </div>
                    </div>
                    <div className="payment m-auto w-[95vw] lg:w-[70vw] flex items-center  lg:flex-row flex-col gap-10">
                        <div className="msg w-full lg:w-1/2 h-[50vh] border border-black p-5 rounded-xl overflow-y-scroll overflow-x-hidden">
                            <h2 className='font-bold text-xl mb-3'>Payments</h2>
                            {currentpayments.length == 0 && <div>No payments yet.</div>}
                            {currentpayments.map((element) => {

                                return <li key={element.oid} className='border border-black p-1 rounded-full pl-2 list-none flex gap-1  items-center m-3'>
                                    <img className=' border  border-black rounded-full' width={35} src="man.gif" alt="img" />
                                    <div className='text-left' >{element.name} donated ₹{element.amount} with a message "{element.message}"</div>
                                </li>

                            })}

                        </div>
                        <div className="pay w-full lg:w-1/2 h-[50vh] border border-black p-5 rounded-xl">
                            <h2 className='font-bold text-xl mb-3'>Make a payment</h2>
                            <div className="payinfo w-[80%] flex flex-col gap-3 m-auto">
                                <input onChange={(e) => { handlechange(e) }} value={paymentform.name} name='name' className='border border-black rounded-md px-2 py-1 w-full' type="text" placeholder='Enter name' />
                                <input onChange={(e) => { handlechange(e) }} value={paymentform.message} name='message' className='border border-black rounded-md px-2 py-1 w-full' type="text" placeholder='Enter message' />
                                <input onChange={(e) => { handlechange(e) }} value={paymentform.amount} name='amount' className='border border-black rounded-md px-2 py-1 w-full' type="text" placeholder='Enter amount' />


                                <button onClick={() => { pay(Number.parseInt(paymentform.amount)) }} disabled={!paymentform.name || !paymentform.message || !paymentform.amount} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800  rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 font-bold disabled:opacity-40 ">Pay</button>
                                <div className="amount flex gap-3">

                                    <button onClick={() => { pay(Number.parseInt(30)) }} className='border border-black px-2 py-1 bg-slate-200 font-bold rounded-md'>Pay ₹30</button>
                                    <button onClick={() => { pay(Number.parseInt(50)) }} className='border border-black px-2 py-1 bg-slate-200 font-bold rounded-md'>Pay ₹50</button>
                                    <button onClick={() => { pay(Number.parseInt(100)) }} className='border border-black px-2 py-1 bg-slate-200 font-bold rounded-md'>Pay ₹100</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage
