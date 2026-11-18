


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

import { createProject } from "../actions/crud";

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
        [name]:
            typeof value === "function"
                ? value(prev[name])
                : value,
    }));
};

  // رفتن به مرحله بعد
  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
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
      teamMembers: prev.teamMembers.filter(
        (member) => member.id !== id
      ),
    }));
  };

  // ثبت نهایی تمام اطلاعات
  const handleSubmit = async () => {
    if (loading) return;

    setLoading(true);

    try {
      console.log("اطلاعات نهایی فرم:", formData);

      // فعلاً فایل‌ها را از اطلاعات ارسالی جدا می‌کنیم.
      // آپلود واقعی فایل‌ها باید جداگانه انجام شود.
      const payload = {
        ...formData,
        image: formData.image
          ? {
              name: formData.image.name,
            }
          : null,

        images: formData.images.map((item) => ({
          name: item.name,
        })),

        documents: formData.documents.map((item) => ({
          name: item.name,
          size: item.size,
        })),
      };

      const res = await createProject(payload);

      if (!res?.ok) {
        throw new Error(
          res?.message || "خطا در ثبت طرح سرمایه‌گذاری"
        );
      }

      // نگهداری اطلاعات طرح ثبت شده
      setSubmittedProject(
        res.project || res.data?.project || res.data || payload
      );

      // نمایش صفحه موفقیت
      setShowSuccess(true);

    } catch (error) {
      console.error("Create project error:", error);
      alert(error?.message || "خطا در ثبت اطلاعات طرح");
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

  return (
    <>
      <Button onClick={() => setOpen(true)}>
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
                <CreateForm
                  formData={formData}
                  updateField={updateField}
                  nextStep={nextStep}
                />
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
