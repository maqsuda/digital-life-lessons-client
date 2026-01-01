import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../Loading/Loading";
import useAuth from "../../hooks/useAuth";

const Payment = () => {
  const { user } = useAuth();
  const { email } = useParams();
  const axiosSecure = useAxiosSecure();
  console.log("email :", email);

  const { isLoading, data: users } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${email}`);
      console.log(res.data);
      return res.data;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = {
      cost: users?.price,
      userId: users?._id,
      userEmail: users?.email,
      userName: users?.name,
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
