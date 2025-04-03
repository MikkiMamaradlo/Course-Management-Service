import { NextResponse } from "next/server"

// In-memory database (same as in the main route file)
let items = [
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

// GET /api/items/[id] - Get a specific item
export async function GET(request, { params }) {
  const item = items.find((item) => item.id === params.id)

  if (!item) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 })
  }

  return NextResponse.json(item)
}

// PUT /api/items/[id] - Update a specific item
export async function PUT(request, { params }) {
  try {
    const body = await request.json()
    const itemIndex = items.findIndex((item) => item.id === params.id)

    if (itemIndex === -1) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    // Update the item
    items[itemIndex] = {
      ...items[itemIndex],
      name: body.name || items[itemIndex].name,
      description: body.description !== undefined ? body.description : items[itemIndex].description,
    }

    return NextResponse.json(items[itemIndex])
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}

// DELETE /api/items/[id] - Delete a specific item
export async function DELETE(request, { params }) {
  const itemIndex = items.findIndex((item) => item.id === params.id)

  if (itemIndex === -1) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 })
  }

  // Remove the item
  const deletedItem = items[itemIndex]
  items = items.filter((item) => item.id !== params.id)

  return NextResponse.json(deletedItem)
}

