import { useLocation } from "react-router-dom";
import { CardType } from "../Card/Card";
import Title from "../Title/Title";

interface LocationState {
  state: CardType;
}
function Order() {
  const location = useLocation();
  const LocationState = location as LocationState;
  const order = LocationState.state;

  return (
    <>
      <Title text={`Order: ${order.name}`}>
        <small className="text-muted d-block">name of the restaurant</small>
      </Title>
      <div className="container">
        <div className="row">
          <div className="col-8">
            <div>{order.description}</div>

            <div className="mt-3">
              <label>Comments</label>
              <div>
                <textarea cols={30} rows={4} />
              </div>
            </div>
          </div>
          <div className="col-4">
            <img src={order.imageUrl} alt={order.name} className="img-fluid" />
            <div className="d-flex justify-content-between">
              <div>Rating: {order.rating}</div>
              <div>{order.category}</div>
            </div>
          </div>
        </div>

        <hr />
        <div>
          <label>Price:</label>
          {order.price}
        </div>
      </div>
    </>
  );
}

export default Order;
