"use client";

// import ProjectCard from "@/miz/themes/react/components/card-project/page";

// const projects = [
//   {
//     id: 1,
//     image: "/images/project-1.jpg",
//     status: "در حال اجرا",
//     title: "ساخت مجتمع مسکونی",
//     description: "توضیحات مربوط به پروژه اول",
//     amount: "20,000,000 تومان",
//   },
//   {
//     id: 2,
//     image: "/images/project-2.jpg",
//     status: "در حال جذب سرمایه",
//     title: "ساخت مرکز تجاری",
//     description: "توضیحات مربوط به پروژه دوم",
//     amount: "50,000,000 تومان",
//   },
//   {
//     id: 3,
//     image: "/images/project-3.jpg",
//     status: "در حال اجرا",
//     title: "ساخت مجتمع اداری",
//     description: "توضیحات مربوط به پروژه سوم",
//     amount: "35,000,000 تومان",
//   },
// ];

// export default function ProjectsPage() {
//   return (

//         <div className="d-grid grid-3 gap-4">

//         {projects.map((project) => (
//             <ProjectCard
//             key={project.id}
//             {...project}
//             onDetailsClick={() => {
//                 console.log("Project ID:", project.id);
//             }}
//             />
//         ))}

//         </div>
//   );
// }


import SuccessfulProjectCard from "@/miz/themes/react/components/card-project-successful/page";

const projects = [
  {
    id: 1,
    image: "/images/project-1.jpg",
    status: "وضعیت طرح",
    title: "عنوان طرح",
    description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم",
    targetAmount: "50/000/000/000 تومان",
    raisedAmount: "20/000/000/000 تومان",
    investorCount: 124,
    minInvestment: "10/000/000 تومان",
    maxInvestment: "50/000/000 تومان",
    progress: 70,
  },
  {
    id: 2,
    image: "/images/project-1.jpg",
    status: "وضعیت طرح",
    title: "عنوان طرح",
    description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم",
    targetAmount: "50/000/000/000 تومان",
    raisedAmount: "20/000/000/000 تومان",
    investorCount: 124,
    minInvestment: "10/000/000 تومان",
    maxInvestment: "50/000/000 تومان",
    progress: 70,
  },
  {
    id: 3,
    image: "/images/project-1.jpg",
    status: "وضعیت طرح",
    title: "عنوان طرح",
    description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم",
    targetAmount: "50/000/000/000 تومان",
    raisedAmount: "20/000/000/000 تومان",
    investorCount: 124,
    minInvestment: "10/000/000 تومان",
    maxInvestment: "50/000/000 تومان",
    progress: 70,
  },
];

export default function ProjectsPage() {
  return (
    <div className="d-grid grid-3 gap-4">
      {projects.map((project) => (
        <SuccessfulProjectCard
          key={project.id}
          {...project}
          onDetailsClick={() => {
            console.log("Project ID:", project.id);
          }}
        />
      ))}
    </div>
  );
}