import { useParams } from "react-router-dom"
import { useGetProductsQuery } from "../../features/api/apiSlice"
import styles from '../../styles/Category.module.css'
import { useEffect, useState } from "react"
import Products from "../Products/Products"
import { useSelector } from "react-redux"
import Loader from "../Loader/Loader"

const Category = () => {
    const { id } = useParams()

    const {list} = useSelector(({categories}) => categories)

    const defaultValues = {
        title: "",
        price_min: 0,
        price_max: 0,
    }

    const defaultParams = {
        categoryId: id,
        limit: 5,
        offset: 0,
        ...defaultValues
    }

    const [end, setEnd] = useState(false)
    const [categ, setCateg] = useState(null)
    const [items, setItems] = useState([])
    const [values, setValues] = useState(defaultValues)
    const [params, setParams] = useState(defaultParams)


    const handleValues = ({target: { value, name }}) => {
        setValues({...values, [name]: value })
    }

    const {data, isLoading, isSuccess} = useGetProductsQuery(params)
    
    useEffect(() => {
        if(!id) return;

        setValues(defaultValues)
        setEnd(false)
        setItems([])
        setParams({...defaultParams, categoryId: id})
    }, [id])

    useEffect(() => {
        if(!id || !list.length) return;

        const category = list.find((item) => item.id === id * 1)

        setCateg(category)
    }, [id, list])
    
    useEffect(() => {
        if(isLoading) return;

        if(!data.length) return setEnd(true)

        setItems((_items) => [..._items, ...data])
    }, [isLoading, data])


    const handleSubmit = (e) => {
        e.preventDefault()

        setItems([])
        setEnd(false)
        setParams({...defaultParams, ...values})
    }

    console.log(params, "params")
    console.log(items, "items")
    console.log(end, "end")

    const handleReset = () => {
        setValues(defaultValues)
        setParams(defaultParams)
        setItems([])
        setEnd(false)
    }
    
    return (
        <section className={styles.wrapper}>
            <h2>
                {categ?.name}
            </h2>
            <form className={styles.filter} onSubmit={handleSubmit}>
                <div className={styles.group}>
                    <input 
                        name="title"
                        type="text"
                        placeholder="Title"
                        onChange={handleValues}
                        value={values.title}
                    />
                </div>
                <div className={styles.group}>
                    <input 
                        name="price_min"
                        type="text"
                        placeholder="0"
                        onChange={handleValues}
                        value={values.price_min}
                    />
                    <span>from</span>
                </div>
                <div className={styles.group}>
                    <input 
                        name="price_max"
                        type="text"
                        placeholder="0"
                        onChange={handleValues}
                        value={values.price_max}
                    />
                    <span>until</span>
                </div>
                <button type="submit" hidden />
            </form>
            {isLoading
                ? (
                    <div className={styles.loader}>
                        <Loader />
                    </div>
                )
                : !isSuccess || !data.length
                    ? <div className={styles.back}>
                        <span>No results</span>
                        <button onClick={handleReset}>Reset</button>
                    </div>
                    : <Products products={items} amount={items.length} title="" style={{padding: 0}} />
            }
            {!end && <div style={{textAlign: 'center', marginTop: '20px'}}>
                <button onClick={() => setParams({...params, offset: params.offset + params.limit})}>
                    Show more
                </button>
            </div>}
        </section>
    )
}

export default Category