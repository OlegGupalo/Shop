import ProductItem from './ProductItem'
import styles from '../../styles/Products.module.css'

const Products = ({ title, style = {}, products = [], amount}) => {

    const list = products.filter((_, i) => i < amount)

    return (
        <section className={styles.products} style={style}>
            {title && <h2 style={{ textAlign: 'center' }}>{title}</h2>}
            <div className={styles.list}>
                {list.map((item) => (
                    <ProductItem key={item.id} {...item} />
                ))}
            </div>
        </section>
    )
}

export default Products