"use client";
import LoaderFull from "@/components/LoaderFull";
import { useUpdateProfileMutation } from "@/redux/features/Auth/authSlice";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import AddressForm from "./AddressForm";

const Address = ({ showRadioSelection = false,successCallback,setAddressModal }) => {
  const userData = useSelector((state) => state?.auth?.userData);
  const [addresses, setAddresses] = useState([]);
  const [addAddress, setAddAddress] = useState(false);
  const [editAddress, setEditAddress] = useState({
    status: false,
    value: null,
  });
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [updateProfile, { isLoading, isError, error, isSuccess }] =
    useUpdateProfileMutation();

  useEffect(() => {
    if (userData) {
      setAddresses(userData?.addresses);
    }
  }, [userData?.addresses]);

  console.log(userData);
  return (
    <div>
      {isLoading && <LoaderFull />}
      {showRadioSelection&&
      <h2 className="text-2xl font-semibold mb-4">{"Select Delivery Address"}</h2>}
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 m-5 mb-0"
        onClick={() => setAddAddress(true)}
      >
        Add Address
      </button>

      {addAddress || editAddress?.status ? (
        <AddressForm
          setEditAddress={setEditAddress}
          setAddAddress={setAddAddress}
          editAddress={editAddress}
          setSelectedAddress={setSelectedAddress}
        />
      ) : null}
      <div style={showRadioSelection? {maxHeight:300,overflow:"scroll",marginBottom:20}:{}}>
      {addresses.map((item, index) => {
        const isSelected = item?.addressId === selectedAddress?.addressId;

        return (
          <div
            className={`flex max-w-md items-center sm:flex-row flex-col border p-5 m-5 gap-5 ${
              isSelected ? "bg-blue-100" : ""
            }`}
            key={item?.addressId}
          >
            
            {showRadioSelection ? (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="selectedAddress"
                  checked={isSelected}
                  onChange={() => setSelectedAddress(item)}
                />
                <p className="">
                  {item?.address +
                    " " +
                    item?.locality +
                    " " +
                    item?.city +
                    " " +
                    item?.state +
                    " " +
                    item?.pincode}
                </p>
              </label>
            ) : (
              <p className="">
                {item?.address +
                  " " +
                  item?.locality +
                  " " +
                  item?.city +
                  " " +
                  item?.state +
                  " " +
                  item?.pincode}
              </p>
            )}
            <div className="flex justify-end mt-2">
              <button
                onClick={() => {
                  setEditAddress({ status: true, value: item });
                }}
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 max-h-8"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setSelectedAddress(null)
                  updateProfile(
                    JSON.stringify({
                      addressToDeleteId: item?.addressId,
                    })
                  );
                }}
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 max-h-8"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
      </div>
     
      {showRadioSelection?
       <div className="mb-4 flex justify-center gap-5">
          <button
            onClick={() => {
              setAddressModal(false)
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
         
          <button
          disabled={!selectedAddress}
            onClick={()=>successCallback(selectedAddress)}
            className={`px-4 py-2 rounded ${
              selectedAddress
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Place Order
          </button>
        </div>:null}
    </div>
  );
};

export default Address;
