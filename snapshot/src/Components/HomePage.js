import React, { useEffect, useState } from 'react'
import '../Styles/HomePage.css';
import LensIcon from '../Images/LensIcon2.jpg'
import axios from 'axios';
import ImageComponent from './ImageComponent';

const HomePage = () => {
  const [image,setimage]=useState([])
  const [searchtext,setsearchtext]=useState('');
  useEffect(()=>{
   axios.get('https://api.flickr.com/services/rest/',{
      params: {
        method: 'flickr.photos.search',
        api_key: '461742cd969859b253bce1e747621dca',
        text: searchtext,
        per_page: 10,
        format: 'json',
        nojsoncallback: 1
      }
      }).then((response)=>{
        let Response=response.data.photos.photo
        // setimage(response.data.photos.photo)
        // console.log(image)
        const Urls=Response.map(photo=>{
          return `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`
        })

        setimage(Urls);
        console.log(image)
      }).catch(error=>console.log(error))

      
  },[searchtext])

 
 
  function HandleImage(e){
    if(e.target.value){
      setsearchtext(e.target.value);
      console.log(searchtext);
    }else{
      setsearchtext(e.target.innerText);
      console.log(searchtext);
    }
}

  return <>
  <h1 id='snaphead'>SnapShot</h1>
  <div id='searchdiv'>
    <input type='text' onChange={HandleImage} id='searchinput'/>
    <img src={LensIcon} id='lensimage' onClick={HandleImage} alt=""/>
  </div>
  <div id='buttondiv'>
    <button className='searchbutton' onClick={HandleImage} >Mountain</button>
    <button className='searchbutton' onClick={HandleImage}>Beaches</button>
    <button className='searchbutton' onClick={HandleImage}>Birds</button>
    <button className='searchbutton' onClick={HandleImage}>Food</button>
  </div>
  <div id='imagediv'>
  {image.map((data,i)=>{
     return <ImageComponent data={data} key={i}/>
  })}
  </div>
  
  </>
}

export default HomePage
