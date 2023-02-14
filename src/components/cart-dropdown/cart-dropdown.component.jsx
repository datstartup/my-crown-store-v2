import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { useNavigate } from 'react-router-dom';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartDropdownContainer, CardItems, EmptyMessage } from './cart-dropdown.styles';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckOutHandler = () => {
        navigate('/checkout');
    };

    return (
        <CartDropdownContainer>
            <CardItems>
                {cartItems.length ? (
                    cartItems.map((cartItem) => <CartItem key={cartItem.id} cartItem={cartItem} />)
                ) : (
                    <EmptyMessage>Your card is empty</EmptyMessage>
                )}
            </CardItems>
            <Button onClick={goToCheckOutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    );
};

export default CartDropdown;
