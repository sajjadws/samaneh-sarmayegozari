"use client";

import { getFooterItems } from "@/components/config/website/layouts/footer";
import "./footer.css";
import "@/lib/globals-client";

export default function Footer() {
	const items = getFooterItems().sort((a,b) => a.order - b.order);

	return (
		<footer className="footer-test w-100 bg-primary-color gap-6 d-flex flex-column align-items-center px-12 pt-17 pb-11">
			<div className="d-flex justify-content-space-between align-items-center bw-1 border-style-solid border-secondary-color radius-all-large p-5">
				<div className="w-100 d-flex align-items-start">
					<img src={globalThis.getAssets("/media/images/Logo-footer.svg")} alt="" />
				</div>
				<div className="w-100">
					<span className="on-primary-color txt-size-title font-weight-bold">درباره سامانه</span>
					<p className="text-color txt-size-subtitle">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد</p>
				</div>
				<ul className="d-flex flex-column gap-7 align-items-end w-100">
					<li>
						<span className="on-primary-color txt-size-title font-weight-bold">دسترسی سریع:</span>
					</li>
					{
						items.map((item) => (
							<li className="text-color txt-size-normal" key={item.link}>
								<a href={item.link} key={item.link}>{item.label}</a>
							</li>
						))
					}
				</ul>
			</div>
			<span className="txt-size-subtitle on-primary-color">تمامی حقوق محفوظ است.</span>
		</footer>
	);
}
