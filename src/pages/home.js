import React from 'react'
import Navbar from '../components/navbar'
import Announcement from '../components/Announcement'
import Slider from '../components/slider'
import Category from '../components/Category'
import { Products } from '../components/products'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

const Home = () => {
    return (
        <div>
            <Announcement/>
            <Navbar/>
            <Slider/>
            <Category/>
            <Products/>
            <Newsletter/>
            <Footer/>
        </div>
    )
}

export default Home
