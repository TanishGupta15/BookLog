import React from "react";
import axios from "axios";

const OuathCallBack = () => {
  axios
    .get("http://localhost:3001/user/googleAuthRegister")
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  return <div>Outh Page</div>;
};

export default OuathCallBack;
