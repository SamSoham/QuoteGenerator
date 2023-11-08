import { Backdrop, CircularProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import PostCard from "../component/PostCard";
import axios from "axios";
import Navbar from "../component/Navbar";


export default function Bookmark(){

    const [item,setItem] = useState([])
    const [loading,setLoading] = useState(false)

    function fetchItem(){
        setLoading(true)
        let id = JSON.parse(localStorage.getItem('key'))
        if(id){
            id.map(async (x)=>{
                let info =  await axios.get(`https://api.quotable.io/quotes/${x}`)
                setItem(item=>[...item,info.data])
            })
        }  
        setLoading(false)
    }

useEffect(()=>{
    fetchItem()
},[])

    return(
        <Stack
        sx={{
            background:'#161E6C',
            minHeight:"100vh",
            alignItems:"center",
            padding:"16px"
        }}
        >
            <Backdrop open={loading} sx={{color:"#fff",zIndex:'1'}}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <Navbar/>
          <Stack gap="12px">
          {
               
               item.length>0 ? item?.map((x)=>(
                 <PostCard data={x} key={x._id}/>
               ))
               :
               !loading && <Typography sx={{color:"white",fontSize:"20px",marginTop:"16px"}}>No Items in bookmark</Typography>
            }
          </Stack>
        </Stack>
    )
}