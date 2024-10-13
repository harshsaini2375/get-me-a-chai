import React from 'react'
import PaymentPage from '../Components/PaymentPage'

const page = ({ params }) => {
    return (
        <>
           <PaymentPage username={params.username}/>
        </>
    )
}

export default page

export async function generateMetadata({ params }) {
    
    return {
      title: `Support ${params.username} - Get me a Chai`,
    }
  }
   