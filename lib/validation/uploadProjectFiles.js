
export async function uploadProjectFiles(projectId, formData) {
  const uploadData = new FormData();

  if (formData.image?.file) {
    uploadData.append("image", formData.image.file);
  }

  formData.images?.forEach((image) => {
    if (image.file) {
      uploadData.append("images", image.file);
    }
  });

  formData.documents?.forEach((document) => {
    if (document.file) {
      uploadData.append("documents", document.file);
    }
  });

  const response = await fetch(
    `/api/projects/${projectId}/files`,
    {
      method: "POST",
      body: uploadData,
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "خطا در آپلود فایل‌های پروژه"
    );
  }

  return result.data;
}
