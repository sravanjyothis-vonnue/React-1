import image from "../assets/exclamation_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
export function Not_Found() {
  return (
    <>
      <div className="notFoundBody">
        <div className="notFoundText">
          <span className="greenText">404</span> - Page Not Found
        </div>
        <div>
          <img src={image} alt=" " height={80} width={80} />
          <img src={image} alt=" " height={80} width={80} />
          <img src={image} alt=" " height={80} width={80} />
        </div>
      </div>
    </>
  );
}
