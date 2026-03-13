import { NextResponse } from "next/server";
import { saveMessage, TemplateType } from "@/lib/storage";

type Body = {
  id: string;
  yourName: string;
  partnerName: string;
  message: string;
  template: TemplateType;
};

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<Body>;

  if (
    !body.id ||
    !body.yourName ||
    !body.partnerName ||
    !body.message ||
    !body.template
  ) {
    return NextResponse.json(
      { error: "Missing fields" },
      { status: 400 }
    );
  }

  saveMessage({
    id: body.id,
    yourName: body.yourName,
    partnerName: body.partnerName,
    message: body.message,
    template: body.template
  });

  return NextResponse.json({ ok: true });
}

