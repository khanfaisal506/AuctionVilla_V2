import './Viewbid.css';
import { useState , useEffect } from 'react';
import axios from 'axios';
import { _bidapiurl } from '../../api.url.js';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Viewbid() {

  const params = useParams();
  const [ bidDetails , setBidDetails ] = useState([]);

  useEffect(()=>{
    axios.get(_bidapiurl+"fetch?p_id="+params.p_id).then((response)=>{
      setBidDetails(response.data);  
    }).catch((error)=>{
      console.log(error);   
    });
  });      

  return (
    <>
            <div className='viewbid'>
<h1 class="mb-4">View Bidding Details</h1>

<table class="table table-bordered">
<tr>
<th>BiddingID</th>
<th>ProductID</th>
<th>UserID</th>
<th>Bidding Price</th>
<th>Info</th>
</tr>  

{
  bidDetails.map((row)=>(
    <tr>
      <td>{row._id}</td>
      <td>{row.p_id}</td>
      <td>{row.u_id}</td>
      <td>{row.bidprice}</td>
      <td>{row.info}</td>
    </tr>
  ))
}

</table>

</div>
    </>
  );
}

export default Viewbid;
