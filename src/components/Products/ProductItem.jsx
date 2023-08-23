import { Link } from "react-router-dom"
import styles from '../../styles/Products.module.css'

const ProductItem = ({ id, title, images, price, category: {name: cat}, description}) => {

    return (
        <Link to={`/products/${id}`} className={styles.product} key={id}>
            <div className={styles.wrapperImage}>
                <div className={styles.image}
                    style={{ backgroundImage: `url(${images[0]})` }} 
                />
                <div className={styles.description}>
                    {description}
                </div>
            </div>
            <div className={styles.wrapper}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.cat}>{cat}</div>
                <div className={styles.info}>
                    <div className={styles.prices}>
                        <div className={styles.price}>{price}$</div>
                        <div className={styles.oldPrice}>{Math.floor(price * 0.8)}$</div>
                    </div>
                    <div className={styles.purchases}>
                        {Math.floor(Math.random() * 20 + 1)} purchased
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductItem