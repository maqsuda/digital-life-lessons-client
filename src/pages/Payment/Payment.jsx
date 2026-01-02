import { useQuery } from "@tanstack/react-query";
import React from "react";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../Loading/Loading";
import { useParams } from "react-router";

const Payment = () => {
  // const { user } = useAuth();
  const { email } = useParams();
  const axiosSecure = useAxiosSecure();
  // console.log("email :", email);

  const { isLoading, data: userInfo } = useQuery({
    queryKey: ["users", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${email}`);
      // console.log(res.data);
      return res.data;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = {
      cost: userInfo.price,
      userId: userInfo._id,
      userEmail: userInfo.email,
      userName: userInfo.displayName,
    };
    paymentInfo.cost = 1500;
    console.log("Payment Info", paymentInfo);
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    console.log(res.data);
    window.location.href = res.data.url;
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="h-max">
      <h2 className="text-center text-2xl font-bold py-5">
        Please Pay for : {email}
      </h2>
      <button
        onClick={handlePayment}
        className="btn btn-primary justify-center"
      >
        Pay
      </button>
    </div>
  );
};

export default Payment;
