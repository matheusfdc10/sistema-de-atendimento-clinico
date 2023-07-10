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
    "/consultation/:path*",
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
    "/api/consultation/:path*",
    "/api/consultation/search",
    "/api/prescription",
    "/api/prescription/:path*",
  ]
}