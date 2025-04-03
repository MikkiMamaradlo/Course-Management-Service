import { NextResponse } from "next/server"

// In-memory database for courses (shared with the main route)
let courses = [
  {
    id: "1",
    course_code: "CS101",
    course_name: "Introduction to Computer Science",
    description: "Fundamentals of computer science and programming",
    credits: 3,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    course_code: "MATH201",
    course_name: "Calculus I",
    description: "Introduction to differential and integral calculus",
    credits: 4,
    createdAt: new Date().toISOString(),
  },
]

// GET /api/courses/[id] - Get a specific course
export async function GET(request, { params }) {
  const course = courses.find((course) => course.id === params.id)

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 })
  }

  return NextResponse.json(course)
}

// PUT /api/courses/[id] - Update a specific course
export async function PUT(request, { params }) {
  try {
    const body = await request.json()
    const courseIndex = courses.findIndex((course) => course.id === params.id)

    if (courseIndex === -1) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    // Check if course code already exists and it's not the current course's code
    if (
      body.course_code &&
      body.course_code !== courses[courseIndex].course_code &&
      courses.some((course) => course.course_code === body.course_code)
    ) {
      return NextResponse.json({ error: "Course code already exists" }, { status: 400 })
    }

    // Update the course
    courses[courseIndex] = {
      ...courses[courseIndex],
      course_code: body.course_code || courses[courseIndex].course_code,
      course_name: body.course_name || courses[courseIndex].course_name,
      description: body.description !== undefined ? body.description : courses[courseIndex].description,
      credits: body.credits || courses[courseIndex].credits,
    }

    return NextResponse.json(courses[courseIndex])
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}

// DELETE /api/courses/[id] - Delete a specific course
export async function DELETE(request, { params }) {
  const courseIndex = courses.findIndex((course) => course.id === params.id)

  if (courseIndex === -1) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 })
  }

  // Remove the course
  const deletedCourse = courses[courseIndex]
  courses = courses.filter((course) => course.id !== params.id)

  return NextResponse.json(deletedCourse)
}
