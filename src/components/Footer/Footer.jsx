import styles from '../../styles/Footer.module.css'
import { ROUTES } from '../../utils/routes'
import LOGO from '../../images/logo.svg'
import { Link } from 'react-router-dom'
import {ReactComponent as Instagram} from '../../images/instagram.svg'
import {ReactComponent as Telegram} from '../../images/telegram.svg'
import {ReactComponent as Vk} from '../../images/vk.svg'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.logo}>
                <Link to={ROUTES.HOME}>
                    <img src={LOGO} alt="LOGO" />
                </Link>
            </div>
            <div className={styles.rights}>
                Developed by <a href="https://vk.com/ollegggio" target="_blank"  rel="noreferrer">olleggioo</a>
            </div>
            <div className={styles.socials}>
                <a href="https://vk.com/ollegggio" target="_blank"  rel="noreferrer">
                    <Instagram className={styles.icon} />
                </a>
                <a href="https://vk.com/ollegggio" target="_blank"  rel="noreferrer">
                    <Telegram className={styles.icon} />
                </a>
                <a href="https://vk.com/ollegggio" target="_blank"  rel="noreferrer">
                    <Vk className={styles.icon} />
                </a>
            </div>
        </footer>
    )
}

export default Footer