import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../store/cart/cart.selector';

import {
    CartDropdownContainer,
    CardItems,
    EmptyMessage,
} from './cart-dropdown.styles';

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    const goToCheckOutHandler = () => {
        navigate('/checkout');
    };

    return (
        <CartDropdownContainer>
            <CardItems>
                {cartItems.length ? (
                    cartItems.map((cartItem) => (
                        <CartItem
                            key={cartItem.id}
                            cartItem={cartItem}
                        />
                    ))
                ) : (
                    <EmptyMessage>Your card is empty</EmptyMessage>
                )}
            </CardItems>
            <Button onClick={goToCheckOutHandler}>
                GO TO CHECKOUT
            </Button>
        </CartDropdownContainer>
    );
};

export default CartDropdown;
