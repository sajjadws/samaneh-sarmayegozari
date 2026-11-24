

export default async function HomePage() {

  // شبیه‌سازی تأخیر دریافت اطلاعات
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">
        صفحه اصلی
      </h1>

      <p>صفحه با موفقیت بارگذاری شد.</p>

    </main>
  );
}
