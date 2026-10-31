import "/public/css/miz.min.css";
import "@/lib/globals";

export default function homeLayout({children}){
    return (
        <html dir="rtl">
            <body>
                {children}
            </body>
        </html>
    );
}