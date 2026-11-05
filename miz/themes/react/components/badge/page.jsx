export default function BadgePage() {
  return (
    <div className="font-primary bg-color d-flex flex-row h-100 w-100 justify-content-center align-items-center gap-10">

      <div className="badge-wrapper btn btn-primary px-2 py-1">
        <p>button</p>

        <span className="badge top-0 left-0 bg-secondary-light-color radius-all-full">
          <i className="fa-solid fa-house icon-small secondary-color"></i>
        </span>

      </div>

    </div>
  );
}