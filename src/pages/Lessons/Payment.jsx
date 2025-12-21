import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../Loading/Loading";

const Payment = () => {
  const { email } = useParams();
  const axiosSecure = useAxiosSecure();
  const { isLoading, data: userInfo } = useQuery({
    queryKey: ["users", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${email}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = {
      cost: userInfo.price,
      userId: userInfo._id,
      userEmail: userInfo.email,
      userName: userInfo.name,
    };
    console.log(paymentInfo);
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    console.log(res.data);
    window.location.href = res.data.url;
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
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
