import { Order, Topping, Note } from "@/tools/orders.model";

export default function CustomerOrders({ id, name, address, city, size, delivered, toppings, notes }:Order) {
    
    return (
        <div className="py-5">
            <div className="text-2xl text-accent font-bold">Order #{id}:</div>
            <div className="my-2">
                <div className="font-bold"><i className="fa-solid fa-circle-info"></i> Customer Information</div>
                <div>
                    {name}<br />
                    {address}<br />
                    {city}<br />
                </div>
            </div>
            <div className="my-2">
                <div className="font-bold"><i className="fa-solid fa-pizza-slice"></i> Pizza Size</div>
                <div>{size}</div>
            </div>
            <div className="my-2">
                <div className="font-bold"><i className="fa-solid fa-list"></i> Order Details</div>
                    {toppings.map((elem:Topping) => (<div>{elem.topping}</div>))}
            </div>
            <div className="my-2">
                <div className="font-bold"><i className="fa-solid fa-note-sticky"></i> Order Notes</div>
                    {notes.map((elem:Note) => (<div>{elem.note}</div>))}
            </div>
        </div>
    );
}