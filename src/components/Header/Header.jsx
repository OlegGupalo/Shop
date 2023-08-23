import { Link, useNavigate } from "react-router-dom"
import { ROUTES } from "../../utils/routes"
import styles from '../../styles/Header.module.css'
import LOGO from '../../images/logo.svg'
import AVATAR from '../../images/avatar.svg'
import {ReactComponent as SEARCH} from '../../images/search.svg'
import FAVORITE from '../../images/favorite.svg'
import BASKET from '../../images/basket.svg'
import { useDispatch, useSelector } from "react-redux"
import { toggleForm } from "../../features/user/userSlice"
import { useEffect, useState } from "react"
import { useGetProductsQuery } from "../../features/api/apiSlice"


const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { currentUser, cart } = useSelector(({ user }) => user)

    const [values, setValues] = useState({name: "Guest", avatar: AVATAR})

    const [searchValue, setSearchValue] = useState("")
    const {data, isLoading} = useGetProductsQuery({title: searchValue})

    const handleSearch = ({ target: { value } }) => {
        setSearchValue(value);
      };

    const handleClick = () => {
        if(!currentUser) return dispatch(toggleForm(true))
        else navigate(ROUTES.PROFILE)
    }

    useEffect(() => {
        if(!currentUser) return;

        setValues(currentUser)
    }, [currentUser])

    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Link to={ROUTES.HOME}>
                    <img src={LOGO} alt="LOGO" />
                </Link>
            </div>
            <div className={styles.info} onClick={handleClick}>
                <div
                    className={styles.avatar}
                    style={{ backgroundImage: `url(${values.avatar})` }}
                />
                <div className={styles.username}><span>{values.name}</span></div>
                    
            </div>
            <form className={styles.form}>
                <div className={styles.icon}>
                    <SEARCH />
                </div>
                <div className={styles.input}>
                        <input 
                            type="search"
                            name="search"
                            placeholder="Search for anything..."
                            autoComplete="off"
                            onChange={handleSearch}
                            value={searchValue}
                        />
                </div>
                {searchValue && (
                    <div className={styles.box}>
                        {isLoading
                            ? "Loading"
                            : !data.length 
                                ? "No results"
                                : data.map(({ title, images, id }) => {
                                    return (
                                        <Link className={styles.item} onClick={() => setSearchValue("")} to={`/products/${id}`} key={id}>
                                            <div 
                                                className={styles.image} 
                                                style={{ backgroundImage: `url(${images[0]})` }}
                                            />
                                            <div className={styles.title}>
                                                {title}
                                            </div>
                                        </Link>
                                    )
                                })
                        }
                    </div>
                )}
            </form>
            <div className={styles.account}>
                <Link className={styles.favorite}>
                    <img src={FAVORITE} alt="FAVORITE" />
                </Link>

                <Link className={styles.basket} to={ROUTES.CART}>
                    <img src={BASKET} alt="BASKET" />
                    {cart.length && <span className={styles.count}>{cart.length}</span>}
                </Link>
            </div>

        </div>
    )
}

export default Header