import "/public/css/miz.min.css";
import "/public/css/style.min.css";
import "@/lib/globals";

export default function HomeLayout({ children }) {
  return (
    <html lang="fa-IR" dir="rtl">
      <body className="font-primary">{children}</body>
    </html>
  );
}
