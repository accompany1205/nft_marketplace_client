export type TSpecType = {
    id:number
    iClassName:string
    title:string
    description:string
  }

const SpecCard:React.FC<{
    spec:TSpecType
  }
  > = (props) => {
    const { title, description, iClassName } = props.spec;
    return (
      <div className="col-lg-4 col-md-6 mb-sm-30 mb-4">
        <div className="de-card has-border de-card-icon h-100 box-url">
          <i className={iClassName} />
          <div className="text">
            <h4>{title}</h4>
            <p>
              {description}
            </p>
          </div>
        </div>
      </div>
    );
  };

export default SpecCard;
