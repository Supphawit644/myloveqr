import { NextRequest, NextResponse } from "next/server";
import { createSurprise, TemplateType } from "@/lib/surprises";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      yourName,
      partnerName,
      message,
      template,
      passcode,
      photoDataUrl,
      musicDataUrl
    } = body as {
      yourName: string;
      partnerName: string;
      message: string;
      template: TemplateType;
      passcode?: string;
      photoDataUrl?: string;
      musicDataUrl?: string;
    };

    if (!yourName || !partnerName || !message || !template) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const record = createSurprise({
      yourName,
      partnerName,
      message,
      template,
      passcode,
      photo: photoDataUrl,
      music: musicDataUrl
    });

    return NextResponse.json({ id: record.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create surprise" },
      { status: 500 }
    );
  }
}

