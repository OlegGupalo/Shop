import styles from '../../styles/Home.module.css'
import BG from '../../images/computer.png'

const Poster = () => {
    return (
        <section className={styles.home}>
            <div className={styles.title}>BIG SALE 20%</div>
            <div className={styles.product}>
                <div className={styles.text}>
                    <div className={styles.subtitle}>the bestseller of 2023</div>
                    <div className={styles.head}>LENNON r2d2 with NVIDIA 5090 TI</div>
                    <button className={styles.button}>Show now</button>
                </div>
                <div className={styles.image}>
                    <img src={BG}  alt='pictures'/>
                </div>
            </div>
        </section>
    )
}

export default Poster