import { NextResponse } from "next/server"

export async function GET() {
  // API documentation based on the table structure
  const apiDocs = {
    title: "Course Management API Documentation",
    version: "1.0.0",
    endpoints: [
      {
        function: "Create and Manage Courses",
        httpMethod: "POST",
        endpoint: "/api/courses/add",
        dataIncluded: "course_code, course_name, description, credits",
      },
      {
        function: "Get all courses",
        httpMethod: "GET",
        endpoint: "/api/courses",
        dataIncluded: "Returns an array of all courses",
      },
      {
        function: "Create new course (alternative)",
        httpMethod: "POST",
        endpoint: "/api/courses",
        dataIncluded: "course_code, course_name, description, credits",
      },
      {
        function: "Get course by ID",
        httpMethod: "GET",
        endpoint: "/api/courses/:id",
        dataIncluded: "Returns a single course object",
      },
      {
        function: "Update course",
        httpMethod: "PUT",
        endpoint: "/api/courses/:id",
        dataIncluded: "course_code, course_name, description, credits",
      },
      {
        function: "Delete course",
        httpMethod: "DELETE",
        endpoint: "/api/courses/:id",
        dataIncluded: "Returns the deleted course",
      },
      {
        function: "Search courses",
        httpMethod: "GET",
        endpoint: "/api/courses/search",
        dataIncluded: "Query parameters: code, name, minCredits, maxCredits",
      },
    ],
  }

  return NextResponse.json(apiDocs)
}

