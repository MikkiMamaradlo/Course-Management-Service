import { NextResponse } from "next/server";

// In-memory database for users (same as in the main route file)
let users = [
  {
    id: "1",
    username: "user1",
    email: "user1@example.com",
    createdAt: new Date()
  },
  {
    id: "2",
    username: "user2",
    email: "user2@example.com",
    createdAt: new Date()
  }
];

// GET /api/users/[id] - Get a specific user
export async function GET(request, { params }) {
  const user = users.find((user) => user.id === params.id);
  
  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }
  
  return NextResponse.json(user);
}

// PUT /api/users/[id] - Update a specific user
export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const userIndex = users.findIndex((user) => user.id === params.id);
    
    if (userIndex === -1) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    
    // Check if email already exists and it's not the current user's email
    if (body.email && 
        body.email !== users[userIndex].email && 
        users.some(user => user.email === body.email)) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }
    
    // Update the user
    users[userIndex] = {
      ...users[userIndex],
      username: body.username || users[userIndex].username,
      email: body.email || users[userIndex].email
    };
    
    return NextResponse.json(users[userIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

// DELETE /api/users/[id] - Delete a specific user
export async function DELETE(request, { params }) {
  const userIndex = users.findIndex((user) => user.id === params.id);
  
  if (userIndex === -1) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }
  
  // Remove the user
  const deletedUser = users[userIndex];
  users = users.filter((user) => user.id !== params.id);
  
  return NextResponse.json(deletedUser);
}