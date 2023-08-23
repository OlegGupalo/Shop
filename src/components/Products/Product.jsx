import { Link } from 'react-router-dom'
import styles from '../../styles/Product.module.css'
import { ROUTES } from '../../utils/routes'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addItemToCart } from '../../features/user/userSlice'
import { showSnackbar } from '../../features/snackbar/snackbarSlice'

const Product = (item) => {
    const { title, price, images, description } = item;
    const dispatch = useDispatch()

    const [currentImage, setCurrentImage] = useState()
    useEffect(() => {
        if(!images.length) return;

        setCurrentImage(images[0])
    }, [images])

    const addToCart = () => {
        dispatch(addItemToCart(item))
        dispatch(showSnackbar({
            message: "Product added to cart",
            options: {variant: "info"}
        }))
    }

    return  (
        <section className={styles.product}>
            <div className={styles.images}>
                <div className={styles.current} style={{backgroundImage: `url(${currentImage})`}} />
                <div className={styles['images-list']}>    
                    {images.map((item, key) => (
                        <div 
                            key={key}
                            className={styles.image} 
                            style={{backgroundImage: `url(${item})`}} 
                            onClick={() => setCurrentImage(item)} 
                        />
                    ))}
                </div>
            </div>
            <div className={styles.info}>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.price}>{price}$</div>    
                <div className={styles.color}>
                    <span>Color:</span>Green
                </div>
                <div className={styles.sizes}>
                    <span>Sizes:</span><div className={styles.sizing}>
                        <span>4.5</span>
                        <span>5</span>
                        <span>5.5</span>
                    </div>
                </div>
                <div className={styles.description}>{description}</div>
                <div className={styles.actions}>
                    <button className={styles.cart} onClick={addToCart}>Add to cart</button>
                    <button className={styles.favorite}>Add to favourites</button>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.purches}>19 people added</div>
                    <Link to={ROUTES.HOME} className={styles.link}>Return to store</Link>
                </div>
            </div>
        </section>
    )
}

export default Product