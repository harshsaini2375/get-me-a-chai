import React from 'react'
import PaymentPage from '../Components/PaymentPage'

const page = async({ params }) => {
  const { username } = await params
    return (
        <>

           <PaymentPage username={username}/>
        </>
    )
}

export default page

export async function generateMetadata({ params }) {
  const { username } = await params
    
    return {
      title: `Support ${username} - Get me a Chai`,
    }
  }
   