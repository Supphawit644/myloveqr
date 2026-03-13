import { NextResponse } from "next/server";
import { getMessage } from "@/lib/storage";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(_request: Request, { params }: Params) {
  const data = getMessage(params.id);

  if (!data) {
    return NextResponse.json(
      { error: "Not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}

