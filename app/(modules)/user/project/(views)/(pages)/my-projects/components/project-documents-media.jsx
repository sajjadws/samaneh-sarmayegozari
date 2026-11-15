"use client";

import { useState } from "react";
import { Button } from "@/miz/components/react/button/page";
import "../documents-project.scss"

const steps = [
  "اطلاعات اصلی طرح",
  "اطلاعات فنی",
  "تیم مجری",
  "اسناد و تصاویر",
];

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;

    reader.readAsDataURL(file);
  });

export default function ProjectDocumentsMedia({
  formData,
  updateField,
  previousStep,
  handleSubmit,
  loading,
}) {
  const [error, setError] = useState("");

  const coverImage = formData?.image || null;
  const images = formData?.images || [];
  const documents = formData?.documents || [];

  // انتخاب تصویر اصلی
  const handleCoverImage = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!["image/png", "image/jpeg"].includes(file.type)) {
      setError("فرمت تصویر باید PNG یا JPG باشد.");
      e.target.value = "";
      return;
    }

    setError("");

    const preview = await fileToBase64(file);

    updateField("image", {
      file,
      preview,
      name: file.name,
    });

    e.target.value = "";
  };

  // انتخاب تصاویر بیشتر
  const handleImages = async (e) => {
    const files = Array.from(e.target.files || []);

    const validFiles = files.filter((file) =>
      ["image/png", "image/jpeg"].includes(file.type)
    );

    if (validFiles.length !== files.length) {
      setError("فقط تصاویر PNG و JPG قابل انتخاب هستند.");
    } else {
      setError("");
    }

    const newImages = await Promise.all(
      validFiles.map(async (file) => ({
        id: crypto.randomUUID(),
        file,
        name: file.name,
        preview: await fileToBase64(file),
      }))
    );

    updateField("images", [...images, ...newImages]);

    e.target.value = "";
  };

  // انتخاب مدارک
  const handleDocuments = (e) => {
    const files = Array.from(e.target.files || []);

    const allowedExtensions = ["pdf", "docx", "xlsx"];

    const validFiles = files.filter((file) => {
      const extension = file.name.split(".").pop().toLowerCase();
      return allowedExtensions.includes(extension);
    });

    if (validFiles.length !== files.length) {
      setError("فقط فایل‌های PDF، DOCX و XLSX مجاز هستند.");
    } else {
      setError("");
    }

    const newDocuments = validFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      name: file.name,
      size: file.size,
    }));

    updateField("documents", [...documents, ...newDocuments]);

    e.target.value = "";
  };

  // حذف تصویر اصلی
  const removeCover = () => {
    updateField("image", null);
  };

  // حذف تصاویر
  const removeImage = (id) => {
    updateField(
      "images",
      images.filter((image) => image.id !== id)
    );
  };

  // حذف مدارک
  const removeDocument = (id) => {
    updateField(
      "documents",
      documents.filter((doc) => doc.id !== id)
    );
  };

  const formatSize = (size) => {
    return (size / 1024).toFixed(1) + " KB";
  };

  return (
    <div className="documents-page w-80 overflow-y-hidden" >
      <div className="overflow-y-scroll  h-100 ">
        {/* عنوان */}
      <div className="documents-title">
        <h2>ایجاد طرح سرمایه‌گذاری جدید</h2>
      </div>

      {/* نوار مراحل */}
      <div className="documents-steps">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`documents-step ${
              index === 3 ? "active" : "completed"
            }`}
          >
            {step}
          </div>
        ))}
      </div>

      {/* محتوای صفحه */}
      <div className="documents-container">

        <div className="documents-header">
          <h2>اسناد و رسانه‌های طرح</h2>

          <p>
            مدارک و محتوای تصویری مرتبط با طرح سرمایه‌گذاری را بارگذاری کنید.
          </p>
        </div>

        {/* تصویر شاخص */}
        <section className="upload-section">

          <h3>۱. تصویر شاخص طرح</h3>

          <div className="cover-upload">

            {coverImage ? (
              <div className="cover-preview">
                <img
                  src={coverImage.preview}
                  alt="تصویر شاخص طرح"
                />

                <button
                  type="button"
                  className="remove-file"
                  onClick={removeCover}
                >
                  ×
                </button>
              </div>
            ) : (
              <>
                <div className="upload-icon">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="4" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-5-5L5 21" />
                    <path d="M19 3v6M16 6h6" />
                  </svg>
                </div>

                <p>تصویر اصلی طرح را بارگذاری کنید.</p>
                <small>PNG , JPG</small>

                <label className="upload-button">
                  انتخاب تصویر

                  <input
                    type="file"
                    accept="image/png,image/jpeg"
                    onChange={handleCoverImage}
                    hidden
                  />
                </label>
              </>
            )}

          </div>
        </section>

        {/* تصاویر طرح */}
        <section className="upload-section">

          <h3>۲. تصاویر طرح</h3>

          <p className="section-description">
            تصاویر محیط، محصولات یا مراحل اجرای پروژه
          </p>

          <div className="gallery-upload">

            {images.map((image) => (
              <div className="gallery-item" key={image.id}>
                <img
                  src={image.preview}
                  alt={image.name}
                />

                <button
                  type="button"
                  className="remove-file"
                  onClick={() => removeImage(image.id)}
                >
                  ×
                </button>

                <span>{image.name}</span>
              </div>
            ))}

            <label className="add-image">
              <span>+</span>
              <small>افزودن تصویر</small>

              <input
                type="file"
                accept="image/png,image/jpeg"
                multiple
                onChange={handleImages}
                hidden
              />
            </label>

          </div>
        </section>

        {/* مدارک و فایل‌ها */}
        <section className="upload-section">

          <h3>۳. مدارک و فایل‌ها</h3>

          <div className="documents-upload">

            {documents.length === 0 ? (
              <>
                <div className="upload-icon">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6M12 18v-6m-3 3 3-3 3 3" />
                  </svg>
                </div>

                <p>فایل‌های مورد نیاز را بارگذاری کنید.</p>
                <small>PDF , DOCX , XLSX</small>
              </>
            ) : (
              <div className="document-list">
                {documents.map((doc) => (
                  <div className="document-item" key={doc.id}>
                    <div>
                      <strong>{doc.name}</strong>
                      <small>{formatSize(doc.size)}</small>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeDocument(doc.id)}
                      className="remove-document"
                    >
                      حذف
                    </button>
                  </div>
                ))}
              </div>
            )}

            <label className="upload-button">
              انتخاب فایل

              <input
                type="file"
                accept=".pdf,.docx,.xlsx"
                multiple
                onChange={handleDocuments}
                hidden
              />
            </label>

          </div>
        </section>

        {/* خطا */}
        {error && (
          <p className="upload-error">
            {error}
          </p>
        )}

        {/* دکمه‌ها */}
        <div className="documents-footer">

          <Button
            type="button"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "در حال ثبت..." : "ثبت"}
          </Button>

          <Button
            type="button"
            disabled={loading}
            onClick={previousStep}
          >
            ← مرحله قبل
          </Button>

        </div>

      </div>
      </div>
      
    </div>
  );
}
