export { default } from "next-auth/middleware";
export const config = {
  matcher:
    "/((?!api/existingUserEmail|api/auth|api/register|_next/image|_next/static|register|favicon.ico|$).*)",
};

// import { withAuth } from "next-auth/middleware";

// export default withAuth(
//   function middleware(req) {
//     return NextResponse.rewrite(new URL("/", req.url));
//   },
//   {
//     callbacks: {
//       authorized({ token }) {
//         return token?.role === "admin";
//       },
//     },
//   }
// );
