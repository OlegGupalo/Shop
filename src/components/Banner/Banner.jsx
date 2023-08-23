import styles from '../../styles/Home.module.css'
import bannerImage from '../../images/banner.jpg'

const Banner = () => {
    return (
        <section className={styles.banner}>
            <div className={styles.left}>
                <p className={styles.content}>
                    NEW YEAR
                    <span className={styles.sale}>SALE</span>
                </p>
                <button className={styles.more}>See more</button>
            </div>
            <div className={styles.right}
                style={{ backgroundImage: `url(${bannerImage})` }}>
                <p>Save up to 70% off</p>
            </div>
        </section>
    )
}

export default Banner