import React from 'react'
import ImageSlider from './ImageSlider'
import img5 from './images/img5.webp'
import "./Home.css";
import { MdSell } from "react-icons/md";
import nescafe from './images/nescafe.jpeg'
import shoe from './images/shoe.jpeg'
import tshirt from './images/tshirt.jpeg'
import cake from './images/cake.jpeg'
import saree from './images/saree.jpeg'
import chicken from './images/chicken.jpeg'
import toy from './images/toy.jpeg'
import watch from './images/watch.jpeg'

function Home() {
  return (
    <div>
        <ImageSlider/> <br/> <br/><br/><br/>
        {/* <img src={img5} alt='sale'>
        </img> */}
        <div className='best'>
            <h1>Best Seller<MdSell/></h1>
        </div>
        <div className='best-seller-section'>
            {/* Mega Sale Image
            <img src={img5} alt='Mega Sale' className='mega-sale-img'/> */}

            {/* Nescafe Coffee Section */}
            <div className='sell'>
                <img src={nescafe} alt='Nescafe Coffee' />
                <div className='cont'>
                    <h2>Nescafe Coffee Powder</h2>
                </div>
            </div>

            <div className='sell'>
                <img src={shoe} alt='shoee' />
                <div className='cont'>
                    <h2>Shoe</h2>
                </div>
            </div>

            <div className='sell'>
                <img src={tshirt} alt='Tshirt' />
                <div className='cont'>
                    <h2>T Shirt</h2>
                </div>
            </div>

            <div className='sell'>
                <img src={cake} alt='cake' />
                <div className='cont'>
                    <h2>Birthday Cake</h2>
                </div>
            </div>
        </div>


        <div className='best-seller-section'>
            <div className='sell'>
                <img src={saree} alt='Nescafe Coffee' />
                <div className='cont'>
                    <h2>Nescafe Coffee Powder</h2>
                </div>
            </div>

            <div className='sell'>
                <img src={chicken} alt='chicken' />
                <div className='cont'>
                    <h2>Chicken</h2>
                </div>
            </div>

            <div className='sell'>
                <img src={toy} alt='toy' />
                <div className='cont'>
                    <h2>Childrens toy</h2>
                </div>
            </div>

            <div className='sell'>
                <img src={watch} alt='Watch' />
                <div className='cont'>
                    <h2>High Branded watches</h2>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home