"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Modal } from "@/miz/themes/react/components/modal/page";
import { Button } from "@/miz/components/react/button/page";
import { uploadProjectFiles } from "@/lib/validation/uploadProjectFiles";
import CreateForm from "./create-form";
import TechnicalDetailsProject from "./technical-details-project";
import ExecutionTeam from "./execution-team";
import ProjectDocumentsMedia from "./project-documents-media";
import ProjectSuccess from "./project-success";
import { Plus } from "lucide-react";
import {
	createProject,
	updateProject,
	saveProjectStep,
	getProjectWizard,
	getIncompleteProjects,
	completeProject,
} from "../actions/crud";
import { toast } from "@/miz/components/react/toast/page";

const initialFormData = {
	title: "",
	categoryId: "",
	durationDate: "",
	description: "",

	targetAmount: "",
	minInvestment: "",
	maxInvestment: "",
	expectedProfit: "",
	investmentDetails: "",

	phases: [],
	teamMembers: [],

	image: null,
	images: [],
	documents: [],
};

export default function CreateProject() {
	const [projectId, setProjectId] = useState(null);

	const [draftProjects, setDraftProjects] = useState([]);

	const router = useRouter();

	const [open, setOpen] = useState(false);
	const [currentStep, setCurrentStep] = useState(0);

	const [loading, setLoading] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);

	const [submittedProject, setSubmittedProject] = useState(null);

	// تمام اطلاعات فرم در این State نگهداری می‌شوند
	const [formData, setFormData] = useState(initialFormData);

	// به‌روزرسانی اطلاعات هر مرحله
	const updateField = (name, value) => {
		setFormData((prev) => ({
			...prev,
			[name]: typeof value === "function" ? value(prev[name]) : value,
		}));
	};

	// رفتن به مرحله بعد

	const stepNames = ["BASIC_INFO", "TECHNICAL_DETAILS", "EXECUTION_TEAM", "DOCUMENTS"];

	const nextStep = async (values = {}) => {
		if (loading) return;

		setLoading(true);

		try {
			let res;

			if (currentStep === 0) {
				// اگر پروژه قبلی انتخاب شده باشد، اطلاعات آن را ویرایش کن
				if (projectId) {
					res = await updateProject(projectId, values);
				} else {
					// بررسی وجود پروژه پیش‌نویس
					const draftRes = await getIncompleteProjects();

					if (!draftRes?.ok) {
						throw new Error(draftRes?.message || "دریافت پروژه‌های پیش‌نویس ناموفق بود.");
					}

					const drafts = draftRes.data || [];

					if (drafts.length > 0) {
						// ادامه اولین پروژه پیش‌نویس
						const draft = drafts[0];

						const wizardRes = await getProjectWizard(draft.id);

						if (!wizardRes?.ok) {
							throw new Error(wizardRes?.message || "بازیابی پروژه ناموفق بود.");
						}

						const project = wizardRes.data;

						setProjectId(project.id);

						// به‌روزرسانی اطلاعات مرحله اول پروژه قبلی
						res = await updateProject(project.id, values);

						if (res?.ok) {
							// اطلاعات مراحل بعدی پروژه را هم در فرم نگه می‌داریم
							setFormData({
								...initialFormData,
								...values,
								phases: (project.phases || []).map((phase) => ({
									...phase,
									targetAmount: phase.totalAmount,
									expectedRevenue: phase.ProjectedRevenue,
									expectedProfit: phase.profitAmount,
								})),
								teamMembers: [],
								image: null,
								images: [],
								documents: [],
							});

							// انتقال به مرحله بعد از آخرین مرحله ذخیره‌شده
							const stepMap = {
								FIRST: 1,
								SECOND: 2,
								THIRD: 3,
								FOURTH: 3,
							};

							setCurrentStep(stepMap[project.step] ?? 1);

							toast.add({
								title: "پروژه پیش‌نویس بازیابی شد.",
							});

							return;
						}
					} else {
						// در صورت نبود پیش‌نویس، پروژه جدید ایجاد شود
						res = await createProject(values);
					}
				}

				if (!res?.ok) {
					throw new Error(res?.message || "ذخیره اطلاعات پروژه ناموفق بود.");
				}

				if (res.projectId || res.data?.id) {
					setProjectId(res.projectId || res.data.id);
				}

				setFormData((prev) => ({
					...prev,
					...values,
				}));
			} else {
				res = await saveProjectStep({
					projectId,
					completedStep: stepNames[currentStep],
					values,
				});

				if (!res?.ok) {
					throw new Error(res?.message || "ذخیره مرحله ناموفق بود.");
				}

				setFormData((prev) => ({
					...prev,
					...values,
				}));
			}

			setCurrentStep((prev) => prev + 1);

			toast.add({
				title: "اطلاعات مرحله با موفقیت ذخیره شد.",
			});
		} catch (error) {
			console.error("Next Project Step:", error);

			toast.add({
				title: error.message || "خطا در ذخیره اطلاعات",
			});
		} finally {
			setLoading(false);
		}
	};

	// برگشت به مرحله قبل
	const previousStep = () => {
		setCurrentStep((prev) => Math.max(prev - 1, 0));
	};

	// اضافه کردن عضو تیم
	const addTeamMember = (member) => {
		setFormData((prev) => ({
			...prev,
			teamMembers: [
				...prev.teamMembers,
				{
					...member,
					id: crypto.randomUUID(),
				},
			],
		}));
	};

	// حذف عضو تیم
	const deleteTeamMember = (id) => {
		setFormData((prev) => ({
			...prev,
			teamMembers: prev.teamMembers.filter((member) => member.id !== id),
		}));
	};

	// ثبت نهایی تمام اطلاعات

	const handleSubmit = async () => {
		try {
			setLoading(true);

			// جدا کردن فایل‌ها از اطلاعات پروژه
			const { image, images, documents, ...projectData } = formData;

			// مرحله اول: ثبت پروژه و اطلاعات وابسته
			const res = await createProject(projectData);

			if (!res?.ok && !res?.success) {
				throw new Error(res?.message || "ثبت پروژه با خطا مواجه شد");
			}

			// دریافت شناسه پروژه ایجادشده
			const project = res?.data?.project || res?.project || res?.data;

			const projectId = project?.id;

			if (!projectId) {
				throw new Error("پروژه ثبت شد اما شناسه آن دریافت نشد");
			}

			// مرحله دوم: آپلود تصاویر و مدارک
			await uploadProjectFiles(projectId, formData);

			// مرحله سوم: نمایش موفقیت
			setSuccessProject(project);
		} catch (error) {
			console.error("Create Project Error:", error);

			// پیام خطا را با سیستم Toast پروژه نمایش بده
			console.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	// بستن و بازنشانی فرم
	const onClose = () => {
		setOpen(false);
		setProjectId(null);
		setDraftProjects([]);
		setCurrentStep(0);
		setShowSuccess(false);
		setSubmittedProject(null);
		setFormData(initialFormData);
	};

	const handleOpen = () => {
		setProjectId(null);
		setCurrentStep(0);
		setFormData(initialFormData);
		setShowSuccess(false);
		setDraftProjects([]);
		setOpen(true);
	};

	const [successProject, setSuccessProject] = useState(false);

	return (
		<>
			<Button onClick={handleOpen}>
				<Plus />
				ایجاد طرح جدید
			</Button>

			<Modal
				open={open}
				onOpenChange={(value) => {
					if (!value) onClose();
					else setOpen(true);
				}}
			>
				<div className="w-100 overflow-y-hidden py-6 px-12">
					{/* صفحه موفقیت */}
					{showSuccess ? (
						<ProjectSuccess
							project={submittedProject}
							onViewDetails={() => {
								router.push("/userdashboard/projects/my-projects");
								onClose();
							}}
							onDashboard={() => {
								router.push("/userdashboard");
								onClose();
							}}
						/>
					) : (
						<>
							{/* مرحله اول */}
							{currentStep === 0 && (
								<CreateForm formData={formData} updateField={updateField} nextStep={nextStep} />
							)}

							{/* مرحله دوم */}
							{currentStep === 1 && (
								<TechnicalDetailsProject
									projectId={projectId}
									formData={formData}
									updateField={updateField}
									currentStep={currentStep}
									nextStep={nextStep}
									previousStep={previousStep}
								/>
							)}

							{/* مرحله سوم */}
							{currentStep === 2 && (
								<ExecutionTeam
									teamMembers={formData.teamMembers}
									addTeamMember={addTeamMember}
									deleteTeamMember={deleteTeamMember}
									currentStep={currentStep}
									nextStep={nextStep}
									previousStep={previousStep}
								/>
							)}

							{/* مرحله چهارم */}
							{currentStep === 3 && (
								<ProjectDocumentsMedia
									formData={formData}
									updateField={updateField}
									previousStep={previousStep}
									handleSubmit={handleSubmit}
									loading={loading}
								/>
							)}
						</>
					)}
				</div>
			</Modal>
		</>
	);
}
