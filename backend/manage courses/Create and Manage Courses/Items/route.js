import { NextResponse } from "next/server"

// In-memory database for demonstration
const items = [
  {
    id: "1",
    name: "Item 1",
    description: "Description for item 1",
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Item 2",
    description: "Description for item 2",
    createdAt: new Date(),
  },
]

// GET /api/items - Get all items
export async function GET() {
  return NextResponse.json(items)
}

// POST /api/items - Create a new item
export async function POST(request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }

    const newItem = {
      id: Date.now().toString(),
      name: body.name,
      description: body.description || "",
      createdAt: new Date(),
    }

    items.push(newItem)

    return NextResponse.json(newItem, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}

