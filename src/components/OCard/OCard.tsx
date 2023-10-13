import "./OCard.scss";

type Props = {
  title: string;
  subTitle?: string;
  children?: JSX.Element;
};

const OCard = (props: Props) => {
  const { title, subTitle, children } = props;
  return (
    <div className="OCard">
      <h1 className="OCard__Title">{title}</h1>
      {subTitle && <p className="OCard__SubTitle">{subTitle}</p>}
      {children && <div className="OCard__Children">{children}</div>}
    </div>
  );
};

export default OCard;
