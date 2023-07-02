import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = { 
  matcher: [
    "/",
    "/consultation",
    "/consultation/register",
    "/doctor",
    "/doctor/:path*",
    "/doctor/register",
    "/patient",
    "/patient/:path*",
    "/patient/register",


    "/api/doctor",
    "/api/doctor/:path*",
    "/api/doctor/search",
    "/api/patient",
    "/api/patient/:path*",
    "/api/patient/search",
    "/api/consultation",
  ]
}