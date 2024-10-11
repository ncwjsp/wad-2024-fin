import Customer from "@/models/Customer";

// GET request to fetch a single customer by ID
export async function GET(request, { params }) {
  const id = params.id; // Get the ID from params
  const customer = await Customer.findById(id); // Find the customer by ID

  // If customer not found, return a 404 error
  if (!customer) {
    return new Response("Customer not found", { status: 404 });
  }

  // Return the customer as a JSON response
  return new Response(JSON.stringify(customer), {
    headers: { "Content-Type": "application/json" },
  });
}

// DELETE request to delete a customer by ID
export async function DELETE(request, { params }) {
  const id = params.id; // Get the ID from params
  const customer = await Customer.findByIdAndDelete(id); // Delete the customer by ID

  // If customer not found, return a 404 error
  if (!customer) {
    return new Response("Customer not found", { status: 404 });
  }

  // Return the deleted customer as a JSON response
  return new Response(JSON.stringify(customer), {
    headers: { "Content-Type": "application/json" },
  });
}
