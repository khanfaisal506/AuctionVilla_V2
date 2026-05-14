import './CpUser.css'
import { useState , useEffect } from 'react';
import { _userapiurl } from '../../api.url';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CpUser()
{

    const[output , setOutput ] = useState(); 
    const[opass , setOldPassword ] = useState(); 
    const[npass , setNewPassword ] = useState();
    const[cnpass , setConfirmNewPassword ] = useState();
    const navigate=useNavigate();

    const handelSubmit =()=>{
            axios.get(_userapiurl+"fetch?email="+localStorage.getItem("email")+"&password="+opass).then((response)=>{
                if(npass==cnpass)
                    {

                    }
                    else{
                        setOutput("New Password's Don't Match");
                        setNewPassword("");;
                        setConfirmNewPassword("");
                    }
            }).catch((error)=>{
                setOutput("Invalid Old Password");
                setOldPassword(""); 
            });
            let updateDetails={ "condition_obj":{"email":localStorage.getItem("email")} , "content_obj":{"password":cnpass}};
            axios.patch(_userapiurl+"update",updateDetails).then((response)=>{
                setOutput("Password Changed Succesfully")
                setOldPassword("");
                setNewPassword("");
                setConfirmNewPassword("");
            });    
          };
     

    return(
    <>
    <div class="background-image">
    <div class="content-container-cpuser">
    <form class="cpuserpassword">
  <div class="form-group">
  <font color='blue'>{output}</font>
  <br/>
    <label for="opass">Old Password</label>
    <input type="password" class="form-control" value={opass} onChange={e => setOldPassword(e.target.value)}/>
  </div>
  <div class="form-group">
    <label for="npass">New Password</label>
    <input type="password" class="form-control" value={npass} onChange={e => setNewPassword(e.target.value)}/>
  </div>
  <div class="form-group">
    <label for="cnpass">Confirm New Password</label>
    <input type="password" class="form-control" value={cnpass} onChange={e => setConfirmNewPassword(e.target.value)}/>
  </div>
  <button type="button" class="btn btn-primary" onClick={handelSubmit}>Submit</button>
</form>
    </div>
    </div>
    
    </>
    );
}

export default CpUser;