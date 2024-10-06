import { addRecruiter, getRecruiters } from "@/lib/firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const recruiters = await getRecruiters();
  return NextResponse.json(recruiters);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  await addRecruiter(data);
  return NextResponse.json({ message: "Recruiter added" });
}
