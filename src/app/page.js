"use client";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./page.module.css";

export default function Home() {
  const data7 = useSelector((state) => console.log(state));
  const [userList, setUserList] = useState([]);
  const [inputName, setInputName] = useState("");
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let data = await fetch("/api/users");
    data = await data?.json();
    setUserList(data?.data || []);
  };
  const handleAdd = () => {
    addUser();
  };
  const addUser = async () => {
    let data = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: inputName }),
    });
    data = await data?.json();
    console.log(data);
    setUserList(data?.data || []);
    setInputName("");
  };
  return (
    <div>
      <ul>
        {userList?.map((item, index) => {
          return <li key={item?._id}>{item?.name}</li>;
        })}
      </ul>
      <input
        type={"text"}
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
      />
      <button onClick={() => handleAdd()}>Add</button>
    </div>
  );
}
