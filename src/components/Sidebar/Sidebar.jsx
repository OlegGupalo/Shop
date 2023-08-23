import { NavLink } from 'react-router-dom'
import styles from '../../styles/Sidebar.module.css'
import { useSelector } from 'react-redux'

const Sidebar = () => {

    const {list} = useSelector(({ categories }) => categories)

    const navLinkStyles = ({ isActive }) => {
        return {
            color: isActive ? '#511a8b' : 'white'
        }
    }

    return (
        <section className={styles.sidebar}>
            <div className={styles.title}>Categories</div>
            <nav>
                <ul className={styles.menu}>
                    {list.slice(0, 5).map(({ id, name }) => (
                        <li key={id}>
                            <NavLink style={navLinkStyles} to={`/categories/${id}`}>
                                {name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className={styles.footer}>
                <a href="/help" target="_blank"  className={styles.link}>
                    Help
                </a>
                <a href="/terms" target="_blank" style={{textDecoration: 'underline'}}  className={styles.link}>
                    Terms & Conditions
                </a>
            </div>
        </section>
    )
}

export default Sidebar