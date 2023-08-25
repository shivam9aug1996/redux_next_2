import Address from '@/app/account/address/page'
import React from 'react'

const AddressModal = ({setAddressModal,successCallback}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
       <div className="bg-white p-8 rounded shadow-md">
       <Address setAddressModal={setAddressModal} showRadioSelection={true} successCallback={successCallback}/>
       </div>
      
    </div>
  )
}

export default AddressModal