import './EpAdmin.css'
import { useState , useEffect } from 'react';
import { _userapiurl } from '../../api.url';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EpAdmin()
{

    const[name , setName ] = useState(""); 
    const[email , setEmail ] = useState(""); 
    const[address , setAddress ] = useState("");  
    const[mobile, setMobile ] = useState("");
    const[city , setCity ] = useState("");
    const[gender , setGender ] = useState("");
    const[M , setM ] = useState("");
    const[F , setF ] = useState("");
    const [output , setOutput] = useState("");

    const navigate = useNavigate();
    // const [userDetails, setUserDetails ]= useState([]);
    useEffect(()=>{
        axios.get(_userapiurl+"fetch?email="+localStorage.getItem("email")).then((response)=>{
            var userDetails = response.data[0];
            setName(userDetails.name)
            setEmail(userDetails.email)
            setAddress(userDetails.address)
            setMobile(userDetails.mobile)
            setCity(userDetails.city)

            if(userDetails.gender=="male")
                setM("checked")
            else
            setF("checked");

        }).catch((error)=>{
        console.log(error);
    });
    },[]);

    const handelSubmit =()=>{
        {
            let updateDetails={ "condition_obj":{"email":email} , "content_obj":{"name":name , "mobile" : mobile , "address":address,"mobile":mobile,"city":city}};
            axios.patch(_userapiurl+"update",updateDetails).then((response)=>{
                setOutput("Profile Updated")
              navigate("/epadmin");  
            });    
          }
    };

    return(
    <>
    <div class="background-image">
    <div class="content-container-admin">
    {/* <h1 class="welcome-message" >Edit Profile</h1> */}
    <form>
  <div class="form-group">
    <h1>Edit Profile</h1>
    <font color='blue'>{output}</font>
    <br/>
    <label for="name">Name</label>
    <input type="name" class="form-control" value={name} onChange={e => setName(e.target.value)}/>
  </div>
  <div class="form-group">
    <label for="email">Email address:</label>
    <input type="email" class="form-control" value={email} onChange={e => setEmail(e.target.value)}/>
  </div>
  {/* <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" value={password} onChange={e => setPassword(e.target.value)}/>
  </div> */}
  <div class="form-group">
    <label for="mobile">Mobile:</label>
    <input type="text" class="form-control" value={mobile} onChange={e => setMobile(e.target.value)}/>
  </div>
  <div class="form-group">
    <label for="address">Address</label>
    <textarea class='form-control' rows={"3"} value={address} onChange={e => setAddress(e.target.value)}></textarea>
  </div>
  <div class='form-group'>
    <label for="city">City</label>
    <br/>
    <select class='form-control' value={city} onChange={e => setCity(e.target.value)}>
        <option>Select City</option>
        <optgroup label='MP'>
            <option>Indore</option>
            <option>Ratlam</option>
            <option>Bhopal</option>
            </optgroup>
    </select>
  </div>
  <div class='form-group'>
    <label for='gender'>Gender</label>
    <br/>
    &nbsp;&nbsp;
    Male&nbsp;&nbsp;<input type='radio' name='gender' checked={ M } value='male' onChange={e => setGender(e.target.value)}/>
    <br/>
    Female&nbsp;&nbsp;<input type='radio'  name='gender' checked={ F } value='female' onChange={e => setGender(e.target.value)}/>
  </div>
  <button type="button" class="btn btn-primary" onClick={handelSubmit}>Submit</button>
</form>
    </div>
    </div>
    </>
    );
}

export default EpAdmin;