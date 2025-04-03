import { NextResponse } from "next/server"

// In-memory database for courses (shared with the main route)
const courses = [
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

// POST /api/courses/add - Create a new course (as specified in the image)
export async function POST(request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.course_code || !body.course_name || !body.credits) {
      return NextResponse.json({ error: "Course code, name, and credits are required" }, { status: 400 })
    }

    // Check if course code already exists
    if (courses.some((course) => course.course_code === body.course_code)) {
      return NextResponse.json({ error: "Course code already exists" }, { status: 400 })
    }

    const newCourse = {
      id: Date.now().toString(),
      course_code: body.course_code,
      course_name: body.course_name,
      description: body.description || "",
      credits: body.credits,
      createdAt: new Date().toISOString(),
    }

    courses.push(newCourse)

    return NextResponse.json(newCourse, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}

