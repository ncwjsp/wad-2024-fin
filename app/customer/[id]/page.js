export default async function Home({ params }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${API_BASE}/api/customer/${params.id}`, {
      cache: "no-store",
    });

    // Check if the response is ok (status 200-299)
    if (!response.ok) {
      throw new Error(`Error fetching customer: ${response.statusText}`);
    }

    const customer = await response.json();

    console.log(customer);

    return (
      <div className="m-4">
        <h1>Customer Details</h1>
        <p className="font-bold text-xl text-blue-800">{customer.name}</p>
        <p>
          Date of Birth: {new Date(customer.dateOfBirth).toLocaleDateString()}
        </p>
        <p>Member Number: {customer.memberNumber}</p>
        {customer.interests && <p>Interests: {customer.interests}</p>}
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="m-4">
        <h1>Error</h1>
        <p>Could not fetch customer details. Please try again later.</p>
      </div>
    );
  }
}
