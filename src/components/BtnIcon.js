const BtnIcon = (props) => {

  // <i className="fa fa-search" aria-hidden="true"></i>
  return (
    <div
      className="btn-icon"
      onClick={props.handleClick}
    >
      <abbr title={props.title}>
        <i className={props.fa} aria-hidden="true"></i>
      </abbr>
    </div>
  );
};

export default BtnIcon;