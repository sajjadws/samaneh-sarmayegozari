import { LoaderPublic } from "@/miz/themes/react/components/loader-public/page";
import { Button } from "@/miz/themes/react/components/button/page";
import { LoaderPublic } from "@/miz/themes/react/components/loader-public/page";
import PageLoader from "@/miz/themes/react/components/loader-page/page";


export default async function HomePage() {

  // شبیه‌سازی تأخیر دریافت اطلاعات
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">
        صفحه اصلی
      </h1>

      <p>صفحه با موفقیت بارگذاری شد.</p>

      <Button className="d-flex align-items-center gap-2"> دکمه
        <LoaderPublic  />
      </Button>
      
      <PageLoader />
    </main>
  );
}
