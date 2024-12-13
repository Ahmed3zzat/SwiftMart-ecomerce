import React from "react";
import american from "../../assets/images/express.png";
import mastercard from "../../assets/images/masterCard.png";
import paypal from "../../assets/images/paypal.png";
import appStore from "../../assets/images/appStore.jpeg";
import googlePlay from "../../assets/images/googlePlay.png";
import amazon from "../../assets/images/amazon.png";

export default function Footer() {
  return (
    <footer className="bg-green-100 shadow">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        {/* App Section */}
        <h2 className="text-2xl font-bold text-green-700">Get the FreshCart App</h2>
        <p className="text-gray-700 my-2">
          We will send you a link. Open it on your phone to download the app.
        </p>
        <form action="" className="flex gap-3">
          <input
            type="email"
            placeholder="Email.."
            className="w-9/12 rounded-lg p-1 px-3 border border-green-300"
          />
          <button
            type="button"
            className="w-2/12 bg-green-600 p-1 rounded-lg text-white font-bold tracking-wide"
          >
            Share App Link
          </button>
        </form>

        {/* Divider */}
        <hr className="my-6 border-green-400 sm:mx-auto lg:my-8" />

        {/* Payment & App Section */}
        <div className="payment flex flex-col justify-between sm:flex-row">
          {/* Payment Partners */}
          <div className="pay1 flex gap-3 gap-y-1 flex-wrap md:flex-nowrap items-center">
            <p className="whitespace-nowrap text-gray-600">Payment Partners</p>
            <img
              className="max-w-[20%] h-1/2"
              src={amazon}
              alt="amazon-payment"
            />
            <img
              className="max-w-[20%] h-1/2"
              src={american}
              alt="american-express-payment"
            />
            <img
              className="max-w-[20%] h-1/2"
              src={mastercard}
              alt="master-card-payment"
            />
            <img
              className="max-w-[20%] h-1/2"
              src={paypal}
              alt="pay-pal-payment"
            />
          </div>

          {/* App Store Links */}
          <div className="pay2 flex gap-3 items-center">
            <p className="text-gray-600">Get deliveries with FreshCart</p>
            <img
              className="w-1/4"
              src={appStore}
              alt="app-store-deliveries"
            />
            <img
              className="w-1/4"
              src={googlePlay}
              alt="google-play-deliveries"
            />
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="logs items-baseline gap-3 flex lg:hidden text-green-700 mt-6">
          <i className="fa-brands fa-instagram cursor-pointer"></i>
          <i className="fa-brands fa-facebook cursor-pointer"></i>
          <i className="fa-brands fa-tiktok cursor-pointer"></i>
          <i className="fa-brands fa-twitter cursor-pointer"></i>
          <i className="fa-brands fa-linkedin cursor-pointer"></i>
          <i className="fa-brands fa-youtube cursor-pointer"></i>
        </div>

        {/* Divider */}
        <hr className="my-6 border-green-400 sm:mx-auto lg:my-8" />
      </div>
    </footer>
  );
}
