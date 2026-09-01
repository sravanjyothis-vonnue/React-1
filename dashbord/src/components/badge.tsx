type textParameter = {
  text: string;
};

export function Badge({ text }: textParameter) {
  return (
    <div className="badge">
      <div className="indicator"></div>
      <p>{text}</p>
    </div>
  );
}
