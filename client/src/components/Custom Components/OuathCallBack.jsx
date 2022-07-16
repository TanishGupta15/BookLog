import React from "react";
import axios from "axios";

const OuathCallBack = () => {
  axios
    .get(`${process.env.backendUrl}/user/googleAuthRegister`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  return <div>Outh Page</div>;
};

export default OuathCallBack;
