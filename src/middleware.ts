import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Get Authorization from cookies
  const idToken = request.cookies.get("token")?.value;

  if (!idToken) {
    return Response.redirect(new URL("/store", request.url));
  }

  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/verifyToken`, {
      headers: request.headers, // Pass along headers, so that route handler can access cookies
      cache: "no-cache",
    });

    const retrievedToken = await data.json();

    if (retrievedToken.status !== 201) {
      return Response.redirect(new URL("/store", request.url));
    }
  } catch (err) {
    return Response.redirect(new URL("/store", request.url));
  }
}

export const config = {
  matcher: "/store/new-product",
};
