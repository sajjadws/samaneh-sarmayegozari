export default function ForbiddenPage() {
  return (
    <main className="section min-vh-100 d-flex align-items-center justify-content-center">
      <div className="container text-center gap-3">
        <h1>403</h1>
        <h2>دسترسی غیرمجاز</h2>
        <p>حساب کاربری شما مجوز مشاهده این صفحه یا انجام این عملیات را ندارد.</p>
        <a href="/admin/dashboard">بازگشت به داشبورد</a>
      </div>
    </main>
  );
}
