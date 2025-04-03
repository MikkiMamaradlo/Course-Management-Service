import { NextResponse } from "next/server"

// In-memory database for users
const users = [
  {
    id: "1",
    username: "user1",
    email: "user1@example.com",
    createdAt: new Date(),
  },
  {
    id: "2",
    username: "user2",
    email: "user2@example.com",
    createdAt: new Date(),
  },
]

// GET /api/users - Get all users
export async function GET() {
  return NextResponse.json(users)
}

// POST /api/users - Create a new user
export async function POST(request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.username || !body.email) {
      return NextResponse.json({ error: "Username and email are required" }, { status: 400 })
    }

    // Check if email already exists
    if (users.some((user) => user.email === body.email)) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 })
    }

    const newUser = {
      id: Date.now().toString(),
      username: body.username,
      email: body.email,
      createdAt: new Date(),
    }

    users.push(newUser)

    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}

