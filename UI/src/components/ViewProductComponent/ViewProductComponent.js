import './ViewProductComponent.css'
import { useState , useEffect } from 'react';
import { _productapiurl } from '../../api.url';
import axios from 'axios';
import { Link , useParams } from 'react-router-dom';

function ViewProductComponent()
{ 

    const [pDetails, setProductDetails ]= useState([]);
    const params = useParams();

    useEffect(()=>{
        axios.get(_productapiurl+'fetch?subcatnm='+params.subcatnm).then((response)=>{
            const fetchProductDetails=response.data;
            var p=fetchProductDetails.map(product => {
             const initialtime=new Date(product.info);
             const timediffrence = (new Date() - initialtime)/(1000*60*60);
             return{
                ...product,
                timediffrence:timediffrence
             }
    });
    setProductDetails(p);
}).catch((error)=>{
    console.log(error); 
});
    },[]);

    return(
        <>
    <div class="background-image">
    <div class="content-container">
    <center>
    <h1 class="welcome-message-user" >View Product List :  {params.subcatnm} </h1>
    <div id="category-main">
        {
            pDetails.map(row=>(
                <center>
                <table id="ptable" border="1">
                <tr>
                  <td rowspan="3">
                    <center>
                    <img src={`../assets/uploads/picons/${row.piconnm}`} height="150" width="200" />
                    </center>
                  </td>
                  <td><b>Title : {row.title} </b></td>
                </tr>
                <tr>
                  <td><b>Description : {row.description}</b></td>
                </tr>  
                <tr>
                  <td>
                  <b>Base price : {row.baseprice}</b>
                  <br/>
                  { row.timedifference>48 ?<button>Bid Closed</button>:<Link to={`/bidp/${row._id}`} ><button>Bid Running</button></Link> }
                  </td>
                </tr>
                </table>
                <br/><br/>
                </center>
                    
            ))
            }
    </div>
    </center>
    </div>
    </div>

        </>
    )
}

export default ViewProductComponent;