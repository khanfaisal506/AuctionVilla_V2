import './AddCategory.css'
import { useState , useEffect } from 'react';
import axios from 'axios';
import { _categoryapiurl } from '../../api.url' ;


function AddCategory()
{ const [file, setFile] = useState();
  const [catName , setCatName] = useState();
  const [output , setOutput] = useState();

  const handleChange=(event)=>{
    setFile(event.target.files[0]);
  }

  const handleSubmit=(event)=>{
    event.preventDefault();
    var formData = new FormData();
    formData.append('catnm', catName);
    formData.append('caticon', file);
    const config = {
        'content-type': 'multipart/form-data'
    };
    axios.post(_categoryapiurl+"save", formData, config).then((response) => {
      setCatName("");
      setOutput("Category Added Successfully");
    });
  }

  return(
  <>
  <div class="background-image">
  <div class="content-container">
    
  <form>
  <div class="form-group">
  <font color='blue'>{output}</font>
  <br/><br/>
  <label for="catnm">Category Name:</label>
  <input type="text" class="form-control" value={catName} onChange={e => setCatName(e.target.value)} />
  </div>
  <br/>
  <div class="form-group">
  <label for="file">Category Icon:</label>
  <input type="file" class="form-control" onChange={handleChange} />
  </div>
  <br/>
  <button onClick={handleSubmit} type="button" class="btn btn-danger">Add Category</button>
  <br/><br/>
  </form>         
  </div>
  </div>
  </>
  );
}

export default AddCategory;