// import { Navigate, Outlet, useLocation } from "react-router";
// import { useAuthSession } from "@/ui/shared/auth/useAuthSession";
//
// export function ClientProtectedRoute() {
//   const location = useLocation();
//   const { isLoading, isAuthenticated, role } = useAuthSession();
//
//   if (isLoading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <p className="text-sm text-muted-foreground">세션 확인 중...</p>
//       </div>
//     );
//   }
//
//   if (!isAuthenticated) {
//     return (
//       <Navigate
//         to="/login"
//         replace
//         state={{ from: location }}
//       />
//     );
//   }
//
//   if (role !== "client") {
//     return <Navigate to="/" replace />;
//   }
//
//   return <Outlet />;
// }