"use client";

export default function TicketToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  sortOrder,
  onSortChange,
}) {
  return (
    <div className="ticket-toolbar d-flex align-items-center justify-content-space-between gap-3 flex-wrap">

      <input
        type="text"
        className="ticket-search"
        placeholder="جستجو بر اساس موضوع، شناسه یا نام کاربر..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <div className="d-flex align-items-center gap-2 flex-wrap">

        <select
          className="ticket-filter"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="">همه وضعیت‌ها</option>
          <option value="UNDER_REVIEW">در حال بررسی</option>
          <option value="ANSWERED">پاسخ داده شده</option>
          <option value="CLOSED">بسته شده</option>
        </select>

        <select
          className="ticket-filter"
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="desc">جدیدترین</option>
          <option value="asc">قدیمی‌ترین</option>
        </select>

      </div>
    </div>
  );
}