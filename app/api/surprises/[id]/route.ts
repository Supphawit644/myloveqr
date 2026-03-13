import { NextRequest, NextResponse } from "next/server";
import { getSurprise } from "@/lib/surprises";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(_req: NextRequest, { params }: Params) {
  const surprise = getSurprise(params.id);
  if (!surprise) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(surprise);
}

