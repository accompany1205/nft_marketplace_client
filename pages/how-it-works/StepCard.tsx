export type TStepType = {
    id:number;
    title:string;
  }

const StepCard:React.FC<{
    step:TStepType
  }> = (props) => {
    const { id, title } = props.step;
    return (

      <div className="col-lg-3 col-md-6 mb-sm-30" key={id}>
        <div className="de-card-icon h-100 box-url">
          <span className="steps_heading_number">{id}</span>
          <div className="text">
            <h6>{title}</h6>
          </div>
        </div>
      </div>
    );
  };

export default StepCard;
