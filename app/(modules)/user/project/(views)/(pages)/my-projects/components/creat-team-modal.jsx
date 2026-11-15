
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { Modal } from "@/miz/components/react/modal/page";
import { Button } from "@/miz/components/react/button/page";
import { Input } from "@/miz/themes/react/components/input/page";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/miz/components/react/combobox/page";


const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
];

const initialData = {
  fullName: "",
  description: "",
  startDate: "",
  endDate: "",
  targetAmount: "",
  expectedIncome: "",
  expectedProfit: "",
};

const CreateTeamModal = ({ initialMember = null, onSave }) => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialMember || initialData,
  });

  const selectedName = watch("fullName");

  const onSubmit = async (data) => {
    try {
      if (onSave) {
        await onSave(data);
      }

      reset(initialData);
      setOpen(false);

    } catch (error) {
      console.error("خطا در ثبت عضو تیم:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    reset(initialMember || initialData);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        افزودن عضو جدید
      </Button>

      <Modal
        open={open}
        onOpenChange={setOpen}
        title={initialMember ? "ویرایش عضو" : "افزودن عضو جدید"}
      >
        <div className="px-6 py-8 bg-color radius-all-normal">

          <div className="mb-6">
            <h2 className="text-xl font-bold">
              {initialMember ? "ویرایش عضو" : "افزودن عضو جدید"}
            </h2>

            <p className="mt-2 text-sm">
              اطلاعات فردی که در اجرای این طرح مشارکت دارد را وارد کنید.
            </p>
          </div>

          <form
            id="form-team"
            onSubmit={handleSubmit(onSubmit)}
          >

            {/* نام عضو تیم */}
            <div className="mb-4">
              <label>نام و نام خانوادگی</label>

            <Combobox items={frameworks}>
              <ComboboxInput
                placeholder="یک گزینه انتخاب کنید..."
              />

              <ComboboxContent>
                <ComboboxEmpty>
                  موردی پیدا نشد.
                </ComboboxEmpty>

                <ComboboxList>
                  {(item) => (
                    <ComboboxItem
                      key={item}
                      value={item}
                    >
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>

              {errors.fullName && (
                <small className="text-red-500">
                  نام عضو را انتخاب کنید.
                </small>
              )}
            </div>

              <div className="d-flex">
                <div className="mb-4">
                  <label>سمت</label>

                  <Input 
                    {...register("expectedProfit")}
                    type="text"
                    className="w-full rounded-md border p-3"
                  />
                </div>

                <div className="mb-4">
                  <label>تخصص</label>

                  <Input 
                    {...register("expectedProfit")}
                    type="text"
                    className="w-full rounded-md border p-3"
                  />
                </div>
              </div>
            

            {/* توضیحات */}
            <div className="mb-4 d-flex flex-column">
              <label>شرح مسئولیت</label>

              <textarea
                {...register("description")}
                rows={4}
                className="w-full rounded-md border p-3"
              />
            </div>


            {/* دکمه‌ها */}
            <div className="flex gap-2">

              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "در حال ثبت..."
                  : initialMember
                    ? "ویرایش"
                    : "افزودن"}
              </Button>

              <Button
                type="button"
                onClick={handleClose}
              >
                انصراف
              </Button>

            </div>

          </form>

        </div>
      </Modal>
    </>
  );
};

export default CreateTeamModal;
