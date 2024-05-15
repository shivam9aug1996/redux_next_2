import React from "react";

const Check = async () => {
  await new Promise((res, rej) => {
    setTimeout(() => {
      res("hii");
    }, 2000);
  });
  return <div>welcome</div>;
};

export default Check;
