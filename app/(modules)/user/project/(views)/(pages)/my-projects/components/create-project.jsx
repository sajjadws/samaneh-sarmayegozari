
"use client";

import { useState } from "react";
import { Modal } from "@/miz/components/react/modal/page";
import { Button } from "@/miz/components/react/button/page";
import ExecutionTeam from "./execution-team";
import CreateForm from "./create-form";
import TechnicalDetailsProject from "./technical-details-project";
import ProjectDocumentsMedia from "./project-documents-media";
import { useRouter } from "next/navigation";
import ProjectSuccess from "./project-success";


const CreateProject = () => {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    categoryId: "",
    durationDate: "",
    description: "",
    targetAmount: "",
    minInvestment: "",
    maxInvestment: "",
    expectedProfit: "",
    investmentDetails: "",
    image: null,
    documents: [],
    teamMembers: [],
    phases: [],
  });

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

  const [showSuccess, setShowSuccess] = useState(false);
const [submittedProject, setSubmittedProject] = useState(null);

  const deleteTeamMember = (id) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter(
        (member) => member.id !== id
      ),
    }));
  };

  const [errors, setErrors] = useState({});

  const onClose = () => {
    setOpen(false);
    setCurrentStep(0);
  };

  const updateField = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const previousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      // عملیات ثبت نهایی طرح
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        ایجاد طرح جدید
      </Button>

      <Modal
        open={open}
        onOpenChange={setOpen}
      >
        <div className="w-50 ">

          {/* مرحله اول */}
          {currentStep === 0 && (
            <CreateForm
              formData={formData}
              updateField={updateField}
              errors={errors}
              onNext={nextStep}
            />
          )}

          {/* مرحله دوم */}
          {currentStep === 1 && (
            <TechnicalDetailsProject
              currentStep={currentStep}
              nextStep={nextStep}
              previousStep={previousStep}
              loading={loading}
              handleSubmit={handleSubmit}
            />
          )}

          {/* مرحله سوم */}
          {currentStep === 2 && (
             <ExecutionTeam
                teamMembers={formData.teamMembers}
                addTeamMember={addTeamMember}
                deleteTeamMember={deleteTeamMember}
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

          {/* مرحله پنجم */}
          {currentStep === 4 && (
            <ProjectSuccess />
          )}

          <div className="project-modal-footer">

            {currentStep > 0 && (
              <Button onClick={previousStep}>
                مرحله قبل
              </Button>
            )}

            {currentStep < 4 ? (
              <Button onClick={nextStep}>
                مرحله بعد ←
              </Button>
            ) : (
              <Button
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "در حال ثبت..." : "ثبت نهایی طرح"}
              </Button>
            )}

          </div>

        </div>
      </Modal>
    </>
  );
};

export default CreateProject;
