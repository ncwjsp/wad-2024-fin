import Customer from "@/models/Customer";
import { NextResponse } from "next/server"; // Use NextResponse

export async function GET() {
  try {
    const customers = await Customer.find();
    return NextResponse.json(customers);
  } catch (error) {
    return new Response("Failed to fetch customers", { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    console.log(body);
    const customer = new Customer(body);
    await customer.save();
    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    return new Response("Failed to create customer", { status: 400 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { _id, dateOfBirth, ...updateData } = body;

    if (dateOfBirth) {
      updateData.dateOfBirth = new Date(dateOfBirth);
    }

    const customer = await Customer.findByIdAndUpdate(_id, updateData, {
      new: true,
    });
    if (!customer) {
      return new Response("Customer not found", { status: 404 });
    }
    return NextResponse.json(customer);
  } catch (error) {
    return new Response("Failed to update customer", { status: 400 });
  }
}
