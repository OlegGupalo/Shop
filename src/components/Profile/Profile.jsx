import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ROUTES } from "../../utils/routes"
import styles from '../../styles/Profile.module.css'
import { update } from "../../features/user/userSlice"

const Profile = () => {
    const dispatch = useDispatch()
    const { currentUser } = useSelector(({ user }) => user)
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        avatar: ""
    })

    const handleChange = ({target: {name, value}}) => {
        setValues({...values, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const isNotEmpty = Object.values(values).every((val) => val);

        if(!isNotEmpty) return;

        dispatch(update(values))
        
    }
    
    useEffect(() => {
        if(!currentUser) return;

        setValues(currentUser)
    }, [currentUser])

    return (
        <section className={styles.profile}>
            {!currentUser ? (
                <span>You need to sign in </span>
            ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.group}>
                        <input 
                            name='name'
                            type='text'
                            value={values.name}
                            onChange={handleChange}
                            autoComplete='off'
                            placeholder='Your name'
                            required
                        />
                    </div>
                    <div className={styles.group}>
                        <input 
                            name='email'
                            type='email'
                            value={values.email}
                            onChange={handleChange}
                            autoComplete='off'
                            placeholder='Your email'
                            required
                        />
                    </div>
                    <div className={styles.group}>
                        <input 
                            name='password'
                            type='password'
                            value={values.password}
                            onChange={handleChange}
                            autoComplete='off'
                            placeholder='Your password'
                            required
                        />
                    </div>
                    <div className={styles.group}>
                        <input 
                            type="avatar"
                            placeholder="Your avatar"
                            name="avatar"
                            value={values.avatar}
                            autoComplete="off"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.submit}>
                        Update an account
                    </button>
                </form>
            )}
        </section>
    )
}

export default Profile