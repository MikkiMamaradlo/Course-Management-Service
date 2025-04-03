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

// GET /api/courses/search - Search courses by query parameters
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")
  const name = searchParams.get("name")
  const minCredits = searchParams.get("minCredits")
  const maxCredits = searchParams.get("maxCredits")

  let filteredCourses = [...courses]

  // Filter by course code
  if (code) {
    filteredCourses = filteredCourses.filter((course) => course.course_code.toLowerCase().includes(code.toLowerCase()))
  }

  // Filter by course name
  if (name) {
    filteredCourses = filteredCourses.filter((course) => course.course_name.toLowerCase().includes(name.toLowerCase()))
  }

  // Filter by minimum credits
  if (minCredits) {
    filteredCourses = filteredCourses.filter((course) => course.credits >= Number.parseInt(minCredits))
  }

  // Filter by maximum credits
  if (maxCredits) {
    filteredCourses = filteredCourses.filter((course) => course.credits <= Number.parseInt(maxCredits))
  }

  return NextResponse.json(filteredCourses)
}

