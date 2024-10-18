import {currencyFormatter} from '../util/formatting'

export default function CartItem({name, quantity, price, onIncr, onDecr}){
    return (<li className="cart-item">
        <p>
            {name} - {quantity} x {currencyFormatter.format(price)}
        </p>
        <p className="cart-item-actions">
            <button onClick={onDecr}>-</button>
            <span>{quantity}</span>
            <button onClick={onIncr}>+</button>
        </p>
    </li>);
}