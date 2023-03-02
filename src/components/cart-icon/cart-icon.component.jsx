import {
    ShoppingIcon,
    CartIconContainer,
    ItemCount,
} from './cart-icon.styles';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectIsCartOpen,
    selectCartCount,
} from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

const CartIcon = () => {
    const dispatch = useDispatch();
    const cartCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectIsCartOpen);
    console.log('IS CART OPEN: ', isCartOpen);

    const toggleIsCartOpen = () =>
        dispatch(setIsCartOpen(!isCartOpen));
    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;
