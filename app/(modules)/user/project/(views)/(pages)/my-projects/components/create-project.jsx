"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Modal } from "@/miz/themes/react/components/modal/page";
import { Button } from "@/miz/components/react/button/page";

import CreateForm from "./create-form";
import TechnicalDetailsProject from "./technical-details-project";
import ExecutionTeam from "./execution-team";
import ProjectDocumentsMedia from "./project-documents-media";
import ProjectSuccess from "./project-success";

import { saveProjectStep, getProjectWizard, getIncompleteProjects, completeProject } from "../actions/crud";

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
			const completedStep = stepNames[currentStep];

			const res = await saveProjectStep({
				projectId,
				completedStep,
				values,
			});

			if (!res?.ok) {
				throw new Error(res?.message);
			}

			// نگهداری شناسه پروژه ایجادشده
			if (res.projectId) {
				setProjectId(res.projectId);
			}

			// به‌روزرسانی State فرم
			if (currentStep === 0) {
				setFormData((prev) => ({
					...prev,
					...values,
				}));
			}

			// رفتن به مرحله بعد فقط پس از ذخیره موفق
			setCurrentStep((prev) => prev + 1);

			toast.add({
				title: "اطلاعات مرحله با موفقیت ذخیره شد.",
			});
		} catch (error) {
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
		if (loading || !projectId) return;

		setLoading(true);

		try {
			// ثبت مرحله چهارم
			const stepResult = await saveProjectStep({
				projectId,
				completedStep: "DOCUMENTS",
				values: {},
			});

			if (!stepResult.ok) {
				throw new Error(stepResult.message);
			}

			// نهایی کردن پروژه
			const res = await completeProject(projectId);

			if (!res.ok) {
				throw new Error(res.message);
			}

			setSubmittedProject(res.data);

			setShowSuccess(true);
		} catch (error) {
			toast.add({
				title: error.message || "خطا در ثبت نهایی پروژه",
			});
		} finally {
			setLoading(false);
		}
	};

	// بستن و بازنشانی فرم
	const onClose = () => {
		setOpen(false);
		setCurrentStep(0);
		setShowSuccess(false);
		setSubmittedProject(null);
		setFormData(initialFormData);
	};

	const resumeProject = async (id) => {
		setLoading(true);

		try {
			const res = await getProjectWizard(id);

			if (!res.ok) {
				throw new Error(res.message);
			}

			const project = res.data;

			setProjectId(project.id);

			setFormData({
				title: project.title,
				description: project.description,
				durationDate: project.durationDate,

				phases: project.phases.map((phase) => ({
					...phase,
					targetAmount: phase.totalAmount,
					expectedRevenue: phase.ProjectedRevenue,
					expectedProfit: phase.profitAmount,
				})),

				teamMembers: project.teamMembers,

				image: null,
				images: [],
				documents: [],
			});

			const stepMap = {
				BASIC_INFO: 1,
				TECHNICAL_DETAILS: 2,
				EXECUTION_TEAM: 3,
				DOCUMENTS: 3,
			};

			setCurrentStep(stepMap[project.step] ?? 0);

			setShowSuccess(false);
			setOpen(true);
		} catch (error) {
			toast.add({
				title: error.message || "بازیابی پروژه ناموفق بود.",
			});
		} finally {
			setLoading(false);
		}
	};

	const handleOpen = async () => {
		setOpen(true);

		const res = await getIncompleteProjects();

		if (res.ok) {
			setDraftProjects(res.data);
		}
	};

	return (
		<>
			<Button onClick={handleOpen}>ایجاد طرح جدید</Button>

			<Modal
				open={open}
				onOpenChange={(value) => {
					if (!value) onClose();
					else setOpen(true);
				}}
			>
				{draftProjects.length > 0 && !projectId && (
					<div className="mb-6">
						<h3 className="font-bold mb-3">ادامه ثبت طرح‌های قبلی</h3>

						{draftProjects.map((project) => (
							<div key={project.id} className="border rounded-md p-3 mb-2 flex justify-between">
								<div>
									<p>{project.title}</p>

									<small>آخرین مرحله: {project.step}</small>
								</div>

								<Button onClick={() => resumeProject(project.id)} disabled={loading}>
									ادامه ثبت
								</Button>
							</div>
						))}
					</div>
				)}
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
