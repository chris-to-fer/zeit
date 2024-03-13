export { default } from "next-auth/middleware";
export const config = {
  matcher: "/((?!api/register|register|favicon.ico|$).*)",
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
