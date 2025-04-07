import { NextRequest, NextResponse } from 'next/server';
import client from "@/db/index";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    // const tempId=id;
    const tempId = parseInt(id, 10);
    console.log("ID:", tempId);
    if (isNaN(tempId)) {
      return NextResponse.json({ error: "Invalid ID parameter" }, { status: 400 });
    }

    const data = await client.customapi.findMany({
      where: { id: tempId }
    });

    if (!data || data.length === 0) {
      return NextResponse.json({ message: "No data found" }, { status: 404 });
    }

    const response = data[0].fields;

    return NextResponse.json({ response });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
