import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { RiMastodonLine } from "react-icons/ri";

function Tasks({ data, fetchTodos, next, back }) {
  return (
    <div className="tasks">
      {data?.map((i) => (
        <div key={i._id} className="tasks__card">
          <span className={i.status}></span>
          <RiMastodonLine />
          <h4>{i.title}</h4>
          <div>
            {back ? (
              <button className="button-back">
                <BiLeftArrow /> Back
              </button>
            ) : null}
            {next ? (
              <button className="button-next">
                Next <BiRightArrow />
              </button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Tasks;
