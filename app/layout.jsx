import "/public/css/miz.min.css";
import AdminLayout from "@/components/layouts/admin-layout";

export default function HomeLayout({ children }) {
  return (
    <html lang="fa-IR" dir="rtl">
      <body className="font-primary">
        <AdminLayout>{children}</AdminLayout>
      </body>
    </html>
  );
}
