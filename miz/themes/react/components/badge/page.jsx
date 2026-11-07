function BadgePage() {
  return (
    <div className="badge-page">

      <div className="badge-wrapper badge-button">

        <p>button</p>

        <span className="badge-top">
          <i className="fa-solid fa-house badge-icon"></i>
        </span>

      </div>

    </div>
  );
}

function BadgeInside() {
  return (
    <div className="badge-page">

      <div className="badge-wrapper badge-button">

        <span className="badge-inside">
          <i className="fa-solid fa-house badge-icon"></i>
        </span>

        <p>button</p>

      </div>

    </div>
  );
}

export {
  BadgeInside,
  BadgePage
};