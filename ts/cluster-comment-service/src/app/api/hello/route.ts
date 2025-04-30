import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl;

  return new NextResponse("Hello! GET" + url.pathname);
}

export async function POST(request: NextRequest) {
  const url = request.nextUrl;
  return new NextResponse("Hello! POST" + url.pathname);
}

export async function PUT(request: NextRequest) {
  const url = request.nextUrl;
  return new NextResponse("Hello! PUT" + url.pathname);
}

export async function DELETE(request: NextRequest) {
  const url = request.nextUrl;
  return new NextResponse("Hello! DELETE" + url.pathname);
}
