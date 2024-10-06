import { NextRequest, NextResponse } from "next/server";
import { getRecruiter } from "@/lib/firebase/firestore";

// GET /api/recruiters/:id
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const slug = url.pathname.split("/").pop() || ""; // Provide a default empty string
  const recruiter = await getRecruiter(slug);
  return NextResponse.json(recruiter);
}

// POST /api/recruiters/:id
export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop() || ""; // Provide a default empty string
  const recruiter = await getRecruiter(id);
  return NextResponse.json(recruiter);
}
