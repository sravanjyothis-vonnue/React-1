interface cardData {
  name: string;
  src: string;
  role: String;
}

export function MemberCard({ name, src, role }: cardData) {
  return (
    <div className="cardConttainer">
      <div className="cardContent">
        <div className="name">
          <span className="fieldName">Name :</span> {name}
        </div>
        <div className="about">
          <span className="fieldName">About :</span> Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Maiores, facilis quo! Reiciendis hic
          quae aliquid quia id neque quaerat dolore a iusto cum perspiciatis
          blanditiis debitis nam sed, culpa ex?
        </div>
        <div className="role">
          <span className="fieldName">Role :</span>
          <span className="greenText"> {role}</span>
        </div>
        <div className="contact">
          <span className="fieldName">Contact :</span> +15 56432186151
        </div>
      </div>
      <div className="image">
        <img src={src} alt="employee-x" />
      </div>
    </div>
  );
}
