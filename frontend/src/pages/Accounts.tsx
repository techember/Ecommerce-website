const Accounts = () => {
  const orders = [
    {
      id: "#52477",
      date: "September 1, 2025",
      payment: "Paid",
      fulfillment: "Fulfilled",
      total: "Rs. 1,624.35",
    },
    {
      id: "#31479",
      date: "January 29, 2025",
      payment: "Paid",
      fulfillment: "Fulfilled",
      total: "Rs. 1,000.85",
    },
  ];

  const userAddress = {
    name: "Kshitij Singh",
    address: "221B Baker Street, Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    zip: "400050",
    phone: "+91 9876543210",
  };

  return (
    <div className="w-full px-10 pt-12 pb-1">
      {/* ---- TITLE ---- */}
      <h1 className="text-6xl font-bold tracking-tighter mb-14">MY ACCOUNT</h1>

      {/* ---- ORDER HISTORY SECTION ---- */}
      <div className="mb-16">
        <h2 className="text-xl uppercase font-semibold tracking-wide mb-6">
          Order History
        </h2>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 font-medium text-sm">Order</th>
                <th className="p-4 font-medium text-sm">Date</th>
                <th className="p-4 font-medium text-sm">Payment Status</th>
                <th className="p-4 font-medium text-sm">Fulfillment Status</th>
                <th className="p-4 font-medium text-sm">Total</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={order.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="p-4 text-blue-600 font-medium">{order.id}</td>
                  <td className="p-4">{order.date}</td>
                  <td className="p-4">{order.payment}</td>
                  <td className="p-4">{order.fulfillment}</td>
                  <td className="p-4">{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ---- ADDRESS SECTION ---- */}
      <div className="mb-16">
        <h2 className="text-xl uppercase font-semibold tracking-wide mb-6">
          Saved Address
        </h2>

        <div className="border border-gray-200 rounded-xl p-6 bg-gray-50">
          <p className="font-semibold text-lg mb-2">{userAddress.name}</p>
          <p>{userAddress.address}</p>
          <p>
            {userAddress.city}, {userAddress.state} - {userAddress.zip}
          </p>
          <p className="mt-2">📞 {userAddress.phone}</p>

          <button className="mt-4 px-6 py-2 rounded-md border border-black hover:bg-black hover:text-white transition">
            Edit Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
