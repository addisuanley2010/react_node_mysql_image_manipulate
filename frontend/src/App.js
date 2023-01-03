import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [image, setImage] = useState([])//for data come from database or from display end point
  const [imageName, setimageName] = useState("") //for image name come from imageuopload end point
  const [name, setName] = useState("")//this for form field name
  const [department, setDepartment] = useState("")//this is for form field department

  const [userInfo, setuserInfo] = useState({  //this is to accept image file from the disk
    file: [],
    filepreview: null,
  });

  useEffect(() => {
    axios.get("http://localhost:8080/display").then((res) => {
      setImage(res.data)
    },[])


  })

  const handleInputChange = (event) => {
    setuserInfo({
      ...userInfo,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });

    const formdata = new FormData();
    formdata.append('avatar', event.target.files[0]);
    axios.post("http://localhost:8080/imageupload", formdata, {
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then((res) => {
        setimageName(res.data.image)
      })
      event.preventDefault()

  }

  const handleInputChangeName = (event) => {
    setName(event.target.value);

  }
  const handleInputChangeDepartment = (event) => {
    setDepartment(event.target.value);

  }



  const submit = (event) => {

    const newData = {
      name: name,
      department: department,
      image: imageName,
    }


    axios.post("http://localhost:8080/insert", newData)
      .then((res) => {
        setimageName(res.data.image)
      })

    setuserInfo({
      ...userInfo,
      file: [],
      filepreview: null
    });
    setName("")
    setDepartment("")
    console.log(newData)
      event.preventDefault()


  }

  const handleDelete = (imageName,e) => {
    axios.delete(`http://localhost:8080/delete/${imageName}`).then((res) => {
      console.log("deleted")
    })
    e.preventDefault()
  }
  return (
    <div className="app">

      <div className="form-div">
        <label className="text-white">Select Image :</label>
        <input type="file" className="form-control" name="image-name" onChange={handleInputChange} /><br /><br />
        <label className="text-white">name :</label>
        <input type="text" className="form-control" name="name" value={userInfo.name} onChange={handleInputChangeName} /><br /><br />
        <label className="text-white">department :</label>
        <input type="text" className="form-control" name="department" value={userInfo.department} onChange={handleInputChangeDepartment} /><br /><br />
        <button className="btn btn-dark" onClick={(e) => submit(e)} > Save </button>




      </div>
      <div className='preview'>
        {userInfo.filepreview !== null ?
          <img className="previewimg" src={userInfo.filepreview} alt="UploadImage" height="250px" width={"200px"} />
          : null}
      </div>

      <div className='images'>
        name: {imageName}
        {image.map((img) => (
          <div key={img.id}>
            <h2>{img.id}</h2>
            <img src={require(`./images/${img.image}`)} alt={img.image} height="250px" width={"200px"} />
            <>
              <p> name: {img.name}</p> &nbsp;
              <p>  depatrmet:{img.department}</p>
            </>
            <button style={{ background: "red" }} onClick={(e) => handleDelete(img.image,e)}>delete</button>
          </div>

        )
        )}
      </div>
      {/* <img src={require("./images/aa.png")} alt="no " height="250px" width={"200px"} />
          <img src={require("./images/aa.png")} alt="no " height="250px" width={"200px"} /> */}

    </div>
  );
}

export default App;