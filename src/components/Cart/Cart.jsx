import { useDispatch, useSelector } from 'react-redux'
import styles from '../../styles/Cart.module.css'

import { ReactComponent as Plus } from '../../images/plus.svg'
import { ReactComponent as Minus } from '../../images/minus.svg'
import { addItemToCart, removeItemFromCart } from '../../features/user/userSlice'
import { sumBy } from '../../utils/common'

const Cart = () => {
    const {cart} = useSelector(({user}) => user)

    const dispatch = useDispatch()

    const handleQuantity = (item, quantity) => {
        dispatch(addItemToCart({...item, quantity}))
    }

    const removeItem = (id) => {
        dispatch(removeItemFromCart(id));
      };

    return (
        <section className={styles.cart}>
            <h3>Your cart</h3>
            {!cart.length 
                ? <div>
                    Empty here
                </div>
                : <div className={styles.field}>
                    {cart.map((item) => {
                        const { id, title, images, category, quantity, price } = item
                        return <div key={id} className={styles.item}>
                            <div className={styles.image} style={{backgroundImage: `url(${images[0]})`}} />
                            <div className={styles.info}>
                                <div className={styles.title}>
                                    {title}
                                </div>
                                <div className={styles.category}>
                                    {category.name}
                                </div>
                            </div>
                            <div className={styles.price}>
                                {price}$
                            </div>
                            <div className={styles.edit}>
                                <div className={styles.icon} onClick={() => handleQuantity(item, Math.max(1, quantity - 1))}>
                                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                                    </svg>
                                </div>
                                <span className={styles.quantity}>{quantity}</span>
                                <div className={styles.icon} onClick={() => handleQuantity(item, Math.max(1, quantity + 1))}>
                                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                    </svg>
                                </div>
                            </div>
                            <div className={styles.total}>
                                {price * quantity}$
                            </div>
                            <div className={styles.close} onClick={() => removeItem(id)}>
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                            </div>


                        </div>
                    })}
                </div>
            }
            <div className={styles.actions}>
                <div className={styles.total}>
                    TOTAL PRICE: {" "}
                    <span>
                        {sumBy(cart.map(({quantity, price}) => quantity * price))}$
                    </span>
                </div>
                <button onClick={() => {}} disabled={true} >Buy</button>
            </div>
        </section>
    )
}

export default Cart