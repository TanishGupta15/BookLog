import React from "react";
import axios from "axios";

const OuathCallBack = () => {
  axios
    .get(`https://booklog-backend.herokuapp.com/user/googleAuthRegister`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  return <div>Outh Page</div>;
};

export default OuathCallBack;
