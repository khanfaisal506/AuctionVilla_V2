import './AddSubCategory.css'
import { useState , useEffect } from 'react';
import axios from 'axios';
import { _categoryapiurl,_subcategoryapiurl } from '../../api.url' ;

function AddSubCategory()
{
    
  { const [file, setFile] = useState();
  const [catName , setCatName] = useState();
  const [subCatName , setSubCatName] = useState();
  const [output , setOutput] = useState();
  const [cDetails , setCategoryDetails ] = useState([]);

        useEffect(()=>{
            axios.get(_categoryapiurl+"fetch").then((response)=>{
                setCategoryDetails(response.data);
            }).catch((error)=>{
                console.log(error);
            });
        });

  const handleChange=(event)=>{
    setFile(event.target.files[0]);
  }

  const handleSubmit=(event)=>{
    event.preventDefault();
    var formData = new FormData();
    formData.append('catnm', catName);
    formData.append('subcatnm', subCatName);
    formData.append('caticon', file);
    const config = {
        'content-type': 'multipart/form-data'
    };
    axios.post(_subcategoryapiurl+"save", formData, config).then((response) => {
      setCatName("");
      setSubCatName("");
      setOutput("Sub Category Added Successfully");
    });
  }

  return(
  <>
  <div class="background-image">
  <div class="content-container">
    
  <form>
  <div class="form-group">
    <label for="catnm">Category Name:</label>
    <select class="form-control" value={catName} onChange={e => setCatName(e.target.value)}>
      <option>Select Category</option>  
      {
        cDetails.map((row)=>(
          <option>{row.catnm}</option>    
        ))
      }
    </select>
  </div>

  <div class="form-group">
  <font color='blue'>{output}</font>
  <br/><br/>
  <label for="catnm">Sub Category Name:</label>
  <input type="text" class="form-control" value={subCatName} onChange={e => setSubCatName(e.target.value)} />
  </div>
  <br/>
  <div class="form-group">
  <label for="file">Sub Category Icon:</label>
  <input type="file" class="form-control" onChange={handleChange} />
  </div>
  <br/>
  <button onClick={handleSubmit} type="button" class="btn btn-danger">Add Sub Category</button>
  <br/><br/>
  </form>         
  </div>
  </div>
  </>
  );
}

}

export default AddSubCategory;