import './ViewProductCategory.css'
import { useState , useEffect } from 'react';
import { _categoryapiurl } from '../../api.url';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ViewProductCategory()
{

    const [cDetails, setCategoryDetails ]= useState([]);
    useEffect(()=>{
        axios.get(_categoryapiurl+'fetch').then((response)=>{
            setCategoryDetails(response.data);
        }).catch((error)=>{
        console.log(error)
    });
    },[]);

    return(
        <>
    <div class="background-image">
    <div class="content-container">
    <center>
    <h1 class="welcome-message-user" >View Category List</h1>
    <div id="category-main">
        {
            cDetails.map(row=>(
                <div class="category-part">
                   <Link to={`/viewpsc/${row.catnm}`}>
        <img src={`/assets/uploads/caticons/${row.caticonnm}`} height='150' width='200'/>
        <br/>
        <b>{row.catnm}</b>
        </Link>
        </div>
            ))}
    </div>
    </center>
    </div>
    </div>

        </>
    )
}

export default ViewProductCategory;