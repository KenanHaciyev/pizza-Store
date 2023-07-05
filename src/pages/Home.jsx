import React from 'react';

import Categories from "../components/Categories"
import Sort from "../components/Sort"
import PizzaBlock from '../components/PizzaBlock'
import { useEffect, useState } from 'react'
import { Skeleton } from '../components/PizzaBlock/Skeleton'

const Home = () => {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch('https://64a2962ab45881cc0ae56477.mockapi.io/items')
            .then((res) => res.json())
            .then((response) => {
                setItems(response)
                setIsLoading(false)
                window.scrollTo(0, 0)
            })
    }, [])

    return (
        <div className="container" >
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(6)].map((item) => <Skeleton />)
                    : items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
            </div>
        </div>
    );
};

export default Home;