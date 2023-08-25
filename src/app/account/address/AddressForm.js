import LoaderFull from "@/components/LoaderFull";
import { useUpdateProfileMutation } from "@/redux/features/Auth/authSlice";
import React, { useState } from "react";
import { useEffect } from "react";

function AddressForm({ setAddAddress,setEditAddress,editAddress,setSelectedAddress }) {
  const [updateProfile, { isLoading, isError, error, isSuccess }] =
    useUpdateProfileMutation();
  const [formData, setFormData] = useState({
    // name: "",
    // mobileNumber: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
  });

  useEffect(()=>{
    if(editAddress?.status){
      let {pincode,locality,address,city,state,landmark=""} = editAddress?.value
      setFormData({
        pincode,
        locality,
        address,
        city,
        state,
        landmark,
      })
    }
  },[editAddress?.status])

  useEffect(() => {
    if (isSuccess) {
      setAddAddress(false);
      setEditAddress({status:false,value:null})
      setSelectedAddress(null)
    }
  }, [isSuccess]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    console.log(formData);
    if(editAddress?.status==true){
      updateProfile(
        JSON.stringify({
          modifiedAddresses: {
            pincode: formData.pincode,
            locality: formData.locality,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            landmark: formData.landmark || "",
            addressId:editAddress?.value?.addressId
          },
        })
      );
    }
    else{
      updateProfile(
        JSON.stringify({
          newAddress: {
            pincode: formData.pincode,
            locality: formData.locality,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            landmark: formData.landmark || "",
          },
        })
      );
    }
  };

  

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      {isLoading ? <LoaderFull />:null}
      <form className="bg-white p-8 rounded shadow-md" onSubmit={handleAddAddress}>
      <h2 className="text-2xl font-semibold mb-4">{editAddress?.status? "Edit Address":"Add Address"}</h2>
        {/* <div className="flex gap-5">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="text-sm font-semibold text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="mobileNumber"
              className="text-sm font-semibold text-gray-600"
            >
              Mobile Number
            </label>
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
        </div> */}
        <div className="flex gap-5">
          <div className="mb-4">
            <label
              htmlFor="pincode"
              className="text-sm font-semibold text-gray-600"
            >
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="locality"
              className="text-sm font-semibold text-gray-600"
            >
              Locality
            </label>
            <input
              type="text"
              id="locality"
              name="locality"
              value={formData.locality}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="address"
            className="text-sm font-semibold text-gray-600"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded focus:border-blue-500 focus:outline-none"
            required
          />
        </div>
        <div className="flex gap-5">
          <div className="mb-4">
            <label
              htmlFor="city"
              className="text-sm font-semibold text-gray-600"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="state"
              className="text-sm font-semibold text-gray-600"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="landmark"
            className="text-sm font-semibold text-gray-600"
          >
            Landmark (Optional)
          </label>
          <input
            type="text"
            id="landmark"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="mb-4 flex justify-center gap-5">
          <button
            onClick={() => {
              setAddAddress(false);
              setEditAddress({status:false,value:null})
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
          type={"submit"}
           // onClick={handleAddAddress}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddressForm;
