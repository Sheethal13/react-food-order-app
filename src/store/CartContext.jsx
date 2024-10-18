import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { },
    clearCart: () => { }
});

function cartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        const existingcartItemIndex = state.items.findIndex((item) =>
            item.id === action.item.id
        );
        const updatedItems = [...state.items];
        if (existingcartItemIndex > -1) {
            const updatedItem = {
                ...state.items[existingcartItemIndex],
                quantity: state.items[existingcartItemIndex].quantity + 1
            };
            updatedItems[existingcartItemIndex] = updatedItem;
        }
        else {
            updatedItems.push({ ...action.item, quantity: 1 })
        }
        return { ...state, items: updatedItems };
    }
    if (action.type === 'REMOVE_ITEM') {
        const existingcartItemIndex = state.items.findIndex((item) =>
            item.id === action.id
        );
        const existingCartItem = state.items[existingcartItemIndex];
        const updatedItems = [...state.items];
        if(existingCartItem.quantity===1){
            
            updatedItems.splice(existingcartItemIndex, 1);
        }
        else{
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1
            };
            updatedItems[existingcartItemIndex]=updatedItem;
        }
        return { ...state, items: updatedItems };
    }
    if (action.type==='CLEAR_CART'){
        return {...state, items:[]};
    }
    return state;
}

export function CartContextProvider({ children }) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });
    
    function addItem(item){
        dispatchCartAction({type:'ADD_ITEM',item});
    }
    function removeItem(id){
        dispatchCartAction({type:'REMOVE_ITEM',id});
    }
    function clearCart(){
        dispatchCartAction({type:'CLEAR_CART'});
    }
    const cartContext={
        items: cart.items,
        addItem,
        removeItem,
        clearCart
    };
    console.log(cartContext);
    return (<CartContext.Provider value={cartContext}>{children}</CartContext.Provider>);
}

export default CartContext;