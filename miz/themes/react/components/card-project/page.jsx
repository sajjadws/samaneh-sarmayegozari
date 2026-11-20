"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../card/page";

import { Button } from "../button/page";

function ProjectCard({
  image,
  status,
  title,
  description,
  amount,
  amountLabel = "مبلغ جذب شده:",
  buttonText = "مشاهده جزئیات",
  onDetailsClick,
}) {
  return (
    <Card className="w-100 bw-1 border-primary-color border-style-solid"  >

      <CardHeader>
        <div className="overflow-hideen radius-all-small aspect-ratio-2x1 bw-1 border-color border-style-solid w-100">
          <img className="w-100"
            src={image}
            // src={globalThis.getAssets(image)}
            alt={title}
          />

          <span
		  >{status}</span>
        </div>
      </CardHeader>

      <CardContent className="gap-2">
        <CardTitle className="txt-size-high-title">
          {title}
        </CardTitle>

        <CardDescription className="secondary-text-color">
          {description}
        </CardDescription>
      </CardContent>

      <CardContent>
        <div className="d-flex justify-content-space-between txt-size-subtitle py-6 px-4 on-primary-color radius-all-small font-weight-regular"
			style={{backgroundColor:"#21865A"}}
		>
          <span>{amountLabel}</span>
          <span>{amount}</span>
        </div>
      </CardContent>

      <CardFooter>
        <Button 
			className="w-100 py-3 font-weight-medium txt-size-normal"
			onClick={onDetailsClick}
		>
          {buttonText} 
		  <i class="fa-solid fa-arrow-left"></i>
        </Button>
      </CardFooter>

    </Card>
  );
}

////////////////////////نحوه استفاده //////////////////
// {projects.map((project) => (
// 	<ProjectCard
// 		key={project.id}
// 		{...project}
// 		onDetailsClick={() => {
// 			console.log("Project ID:", project.id);
// 		}}
// 	/>
// ))}

export default ProjectCard;
