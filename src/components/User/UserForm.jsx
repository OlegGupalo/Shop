import { useDispatch, useSelector } from "react-redux"
import UserSignUp from "./UserSignUpForm"
import styles from '../../styles/User.module.css'
import { toggleForm, toggleFormtype } from "../../features/user/userSlice"
import UserLoginForm from "./UserLoginForm"

const UserForm = () => {
    const {showForm, formType} = useSelector(({ user }) => user)
    const dispatch = useDispatch()
    
    const closeForm = () => dispatch(toggleForm(false))

    const handleFormType = (name) => dispatch(toggleFormtype(name))

    return showForm ? (
        <>
            <div className={styles.overlay} onClick={closeForm} />
            {formType === 'signup' ? (
                    <UserSignUp closeForm={closeForm} handleFormType={handleFormType} />
                ) : (
                    <UserLoginForm closeForm={closeForm} handleFormType={handleFormType} />
                )
            }
        </>
    ) : <></>
}

export default UserForm