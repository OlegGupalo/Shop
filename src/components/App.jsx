import { useDispatch } from "react-redux"
import AppRoutes from "./Routes/Routes"
import Header from './Header/Header'
import { useEffect } from "react"
import { getCategories } from "../features/categories/categoriesSlice"
import Footer from "./Footer/Footer"
import Sidebar from "./Sidebar/Sidebar"
import { getProducts } from "../features/products/productsSlice"
import UserForm from "./User/UserForm"

const App = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCategories())
        dispatch(getProducts())
    }, [dispatch])

    return <div className="app">
        <Header />
        <UserForm />
        <div className="container">
            <Sidebar />
            <AppRoutes />
        </div>
        <Footer />
    </div>
}

export default App