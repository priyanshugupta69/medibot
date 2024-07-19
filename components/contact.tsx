import React from "react";
import Footer from "./footer";

const ContactInfo = () => {
  return (
    <div className="container mx-auto p-10 md:p-32 pt-20 lg:pt-32 py-10 text-justify">
      <h1 className="text-4xl font-bold mb-4">Contact Information</h1>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-6">
            <span>Dr. Tanner Khandaker</span>
            <br /> <span>Cofounder</span>
            <br /> <span>Huego Labs Inc</span>
          </h2>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Address</h3>
            <p>440 North Wolfe Road</p>
            <p>California, CA 94085</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p>Info@huego.ai</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactInfo;
