import React from 'react'
import Navbar from '../components/navbar'
import Announcement from '../components/Announcement'
import { Products } from '../components/products'
import styled from 'styled-components'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

const Container=styled.div`
`

const Title=styled.h1`
margin:20px;
`

const Filtercontainer=styled.div`
display:flex;
justify-content:space-between;
`

const Filter=styled.div`
margin:20px
`
const Filtertext=styled.span`
font-size: 20px;
font-weight: 600;
margin-right: 20px;
`

const Select = styled.select`
    border:1px solid grey;
  padding: 10px;
  margin-right: 20px;

`;
const Option = styled.option``;
export const Category = () => {
    return (
        <Container>
        <Navbar/>
        <Announcement/>
        <Title>Dresses</Title>
        <Filtercontainer>
            <Filter><Filtertext>Filter Products:</Filtertext>
            <Select>
            <Option disabled selected>
              Color
            </Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
          </Select>
          <Select>
            <Option disabled selected>
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
            </Filter>
            <Filter><Filtertext>Sort Products:</Filtertext>
            <Select>
            <Option selected>Newest</Option>
            <Option>Price (asc)</Option>
            <Option>Price (desc)</Option>
          </Select>
            </Filter>
        </Filtercontainer>
        <Products/>
        <Newsletter/>
        <Footer/>
        </Container>
    )
}
