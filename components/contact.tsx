
const ContactInfo = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Contact Information</h1>
      <div className="bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-6">Huego.Ai <br/> Bumblebee Labs</h2>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Address</h3>
          <p>440 North Wolfe Road</p>
          <p>California, CA 94085</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Email</h3>
          <p>Info@huego.ai</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;