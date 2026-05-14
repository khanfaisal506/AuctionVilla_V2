import './ManageUser.css'
import { useState , useEffect } from 'react';
import { _userapiurl } from '../../api.url';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ManageUser()
{

    const navigate = useNavigate();
    const [userDetails, setUserDetails ]= useState([]);
    useEffect(()=>{
        axios.get(_userapiurl+"fetch?role=user").then((response)=>{
            setUserDetails(response.data);
        }).catch((error)=>{
        console.log(error)
    });
    });

   const changeStatus =(s,_id)=>{
        if(s=="block")
        {
          let updateDetails={ "condition_obj":{"_id":_id} , "content_obj":{"status":0}};
          axios.patch(_userapiurl+"update",updateDetails).then((response)=>{
            alert("User Not Verified");
            navigate("/manageuser");  
          });    
        }
        else if(s=="verify")
        {
          let updateDetails={ "condition_obj":{"_id":_id} , "content_obj":{"status":1}};
          axios.patch(_userapiurl+"update",updateDetails).then((response)=>{
            alert("User Verified");
            navigate("/manageuser");  
          });    
        }  
        else
        {
          let deleteDetails={"data":{"_id":_id}};
          axios.delete(_userapiurl+"delete",deleteDetails).then((response)=>{
            alert("User Deleted");
            navigate("/manageuser");  
          });
        }
      };

    return(
    <>
    <div class="background-image">
    <div class="content-container">
    <table class="table table-bordered">
        <thead>
        <tr>
            <th>UserID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>City</th>
            <th>Gender</th>
            <th>Info</th>
            <th>Status</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
        { userDetails.map((row)=>(
                <tr key={row._id}>
                    <td>{row._id}</td>
                    <td>{row.name}</td>
                    <td>{row.email}</td>
                    <td>{row.mobile}</td>
                    <td>{row.address}</td>
                    <td>{row.city}</td>
                    <td>{row.gender}</td>
                    <td>{row.info}</td>
                    <td>
        { row.status==1 && <font color="green">Verified</font> }
        { row.status==0 && <font color="orange">Not Verified</font> }
      </td>
      <td>
        { row.status==1 && <font onClick={()=> changeStatus('block',row._id)} color="blue">ChangeStatus</font> }
        { row.status==0 && <font onClick={()=> changeStatus('verify',row._id)}color="blue">ChangeStatus</font> }
        <br/>
        <font onClick={()=> changeStatus('delete',row._id)}color="red">Delete</font>
            </td>
            </tr>
            ))
        }
    </tbody>
    </table>
    </div>
    </div>
    
    </>
    );
}
export default ManageUser;