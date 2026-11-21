"use client";

import { useState } from "react";
import { Button } from "@/miz/components/react/button/page";
import "../documents-project.scss";
import { Image, MoveRight, Plus } from "lucide-react";
import { Separator } from "@/miz/themes/react/components/separator/page";

const steps = ["اطلاعات اصلی طرح", "اطلاعات فنی", "تیم مجری", "اسناد و تصاویر"];

const fileToBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = () => resolve(reader.result);
		reader.onerror = reject;

		reader.readAsDataURL(file);
	});

export default function ProjectDocumentsMedia({ formData, updateField, previousStep, handleSubmit, loading }) {
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

		const validFiles = files.filter((file) => ["image/png", "image/jpeg"].includes(file.type));

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
			})),
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
			images.filter((image) => image.id !== id),
		);
	};

	// حذف مدارک
	const removeDocument = (id) => {
		updateField(
			"documents",
			documents.filter((doc) => doc.id !== id),
		);
	};

	const formatSize = (size) => {
		return (size / 1024).toFixed(1) + " KB";
	};

	return (
		<div className="scroll-form overflow-hidden width-modal">
			<div className="d-flex flex-column gap-7 w-100 overflow-y-scroll">
				<h2 className="txt-size-mid-titile font-weight-bold">ایجاد طرح سرمایه گذاری جدید</h2>
				<div className="documents-steps d-flex align-items-center justify-content-space-between w-100">
					{steps.map((step, index) => (
						<div className=" d-flex align-items-center w-fit-content w-sm-100" key={step}>
							<div className={`documents-step ${index === 3 ? "active" : "completed"}`}>{step}</div>

							{index !== steps.length - 1 && (
								<div className="documents-step-arrow position-relative d-md-none">
									<span></span>
								</div>
							)}
						</div>
					))}
				</div>
				<div className="bg-card-color radius-all-normal px-6 py-6 shadow-light d-flex flex-column gap-6">
					<div className="documents-header d-flex flex-column gap-1">
						<h2 className="txt-size-title font-weight-bold">اسناد و رسانه‌های طرح</h2>
						<p className="txt-size-normal text-color font-weight-medium mb-2">
							مدارک و محتوای تصویری مرتبط با طرح سرمایه‌گذاری را بارگذاری کنید.
						</p>
						<Separator />
					</div>

					{/* تصویر شاخص */}
					<section className="d-flex flex-column gap-4">
						<h3 className=" txt-size-title font-weight-bold">۱. تصویر شاخص طرح</h3>

						<div className="cover-upload d-flex flex-column align-items-center justify-content-center gap-3 txt-align-center px-7 py-7 bg-primary-light-color">
							{coverImage ? (
								<div className="cover-preview w-100 position-relative">
									<img
										src={coverImage.preview}
										alt="تصویر شاخص طرح"
										className="w-100 h-100 object-contain radius-all-large "
									/>

									<button
										type="button"
										className="remove-file d-flex justify-content-center align-items-center radius-all-full bg-danger-regular-color on-primary-color cursor-pointer z-index-2"
										onClick={removeCover}
									>
										×
									</button>
								</div>
							) : (
								<>
									<div className="upload-icon">
										<Image />
									</div>

									<p className="txt-size-normal font-weight-medium">
										تصویر اصلی طرح را بارگذاری کنید.
									</p>
									<small className="txt-size-subtitle secondary-text-color">PNG , JPG</small>

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
					<section className=" d-flex flex-column gap-4">
						<h3 className=" txt-size-title font-weight-bold">۲. تصاویر طرح</h3>

						<p className="section-description">تصاویر محیط، محصولات یا مراحل اجرای پروژه</p>

						<div className="gallery-upload">
							{images.map((image) => (
								<div className="gallery-item" key={image.id}>
									<img src={image.preview} alt={image.name} />

									<button
										type="button"
										className="remove-file d-flex justify-content-center align-items-center radius-all-full bg-danger-regular-color on-primary-color cursor-pointer z-index-2"
										onClick={() => removeImage(image.id)}
									>
										×
									</button>

									<span>{image.name}</span>
								</div>
							))}

							<label className="add-image bg-primary-light-color radius-all-normal d-flex flex-column align-items-center justify-content-center gap-2 cursor-pointer ">
								<Plus />
								<small className="txt-size-subtitle">افزودن تصویر</small>

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

					<section className="d-flex flex-column gap-4">
						<h3 className=" txt-size-title font-weight-bold">۳. مدارک و فایل‌ها</h3>

						<div className="documents-upload  d-flex flex-column align-items-center justify-content-center gap-3 txt-align-center px-7 py-7">
							{documents.length === 0 ? (
								<>
									<div className="upload-icon primary-color">
										<svg
											width="30"
											height="30"
											viewBox="0 0 30 30"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M11.2508 22.1876C10.7383 22.1876 10.3133 21.7626 10.3133 21.2501V16.0126L9.41328 16.9126C9.05078 17.2751 8.45078 17.2751 8.08828 16.9126C7.72578 16.5501 7.72578 15.9501 8.08828 15.5876L10.5883 13.0876C10.8508 12.8251 11.2633 12.7376 11.6133 12.8876C11.9633 13.0251 12.1883 13.3751 12.1883 13.7501V21.2501C12.1883 21.7626 11.7633 22.1876 11.2508 22.1876Z"
												fill="#123B36"
											/>
											<path
												d="M13.7508 17.1875C13.5133 17.1875 13.2758 17.1 13.0883 16.9125L10.5883 14.4125C10.2258 14.05 10.2258 13.45 10.5883 13.0875C10.9508 12.725 11.5508 12.725 11.9133 13.0875L14.4133 15.5875C14.7758 15.95 14.7758 16.55 14.4133 16.9125C14.2258 17.1 13.9883 17.1875 13.7508 17.1875Z"
												fill="#123B36"
											/>
											<path
												d="M18.75 28.4375H11.25C4.4625 28.4375 1.5625 25.5375 1.5625 18.75V11.25C1.5625 4.4625 4.4625 1.5625 11.25 1.5625H17.5C18.0125 1.5625 18.4375 1.9875 18.4375 2.5C18.4375 3.0125 18.0125 3.4375 17.5 3.4375H11.25C5.4875 3.4375 3.4375 5.4875 3.4375 11.25V18.75C3.4375 24.5125 5.4875 26.5625 11.25 26.5625H18.75C24.5125 26.5625 26.5625 24.5125 26.5625 18.75V12.5C26.5625 11.9875 26.9875 11.5625 27.5 11.5625C28.0125 11.5625 28.4375 11.9875 28.4375 12.5V18.75C28.4375 25.5375 25.5375 28.4375 18.75 28.4375Z"
												fill="#123B36"
											/>
											<path
												d="M27.5 13.4376H22.5C18.225 13.4376 16.5625 11.7751 16.5625 7.50011V2.50011C16.5625 2.12511 16.7875 1.77511 17.1375 1.63761C17.4875 1.48761 17.8875 1.57511 18.1625 1.83761L28.1625 11.8376C28.425 12.1001 28.5125 12.5126 28.3625 12.8626C28.2125 13.2126 27.875 13.4376 27.5 13.4376ZM18.4375 4.76261V7.50011C18.4375 10.7251 19.275 11.5626 22.5 11.5626H25.2375L18.4375 4.76261Z"
												fill="#123B36"
											/>
										</svg>
									</div>

									<p className="txt-size-normal font-weight-medium">
										فایل‌های مورد نیاز را بارگذاری کنید.
									</p>
									<small className="txt-size-subtitle secondary-text-color">PDF , DOCX , XLSX</small>
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

					{error && <p className="upload-error">{error}</p>}

					<div className="documents-footer">
						<Button type="button" disabled={loading} onClick={previousStep}>
							<MoveRight />
							مرحله قبل
						</Button>
						<Button type="button" disabled={loading} onClick={handleSubmit}>
							{loading ? "در حال ثبت..." : "ثبت"}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
