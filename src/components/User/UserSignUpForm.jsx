import styles from '../../styles/User.module.css'
import { ReactComponent as Close } from '../../images/close.svg'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { register } from '../../features/user/userSlice'

const UserSignUp = ({closeForm, handleFormType}) => {
    const dispatch = useDispatch()

    const [values, setValue] = useState({
        name: "",
        email: "",
        password: "",
        avatar: ""
    })

    const handleChange = ({target: {name, value}}) => {
        setValue({...values, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const isNotEmpty = Object.values(values).every((val) => val);

        if(!isNotEmpty) return;

        dispatch(register({values, dispatch}))
        closeForm()
    }

    return <div className={styles.wrapper}>
        <div className={styles.close}>
            <Close onClick={closeForm} className={styles.icon} />
        </div>

        <div className={styles.title}>
            Sign Up
        </div>
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

            <div className={styles.link} onClick={() => handleFormType('login')}>I already have an account</div>

            <button type="submit" className={styles.submit}>
                Create an account
            </button>
        </form>
    </div>
}

export default UserSignUp