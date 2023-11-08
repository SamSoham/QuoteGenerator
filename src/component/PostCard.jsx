import { Stack,Typography,IconButton } from "@mui/material"
import { BookOutlined, Bookmark } from "@mui/icons-material"
import { useEffect, useState } from "react"


export default function PostCard({data}){

    const [selected,setSelected] = useState(false)

    function addItem(x){
    setSelected(true)
      let  item = JSON.parse(localStorage.getItem('key'))
      let array = []
      if(item){
        item.map((x)=>(
            array.push(x)
        ))
      }
      array.push(x)
      localStorage.setItem('key',JSON.stringify(array))
    }

    function removeItem(id){
    setSelected(false)
    let  item = JSON.parse(localStorage.getItem('key'))
    let array = []
    if(item){
      item.map((x)=>{
        if(x!=id)
        array.push(x)
      })
    }
    localStorage.setItem('key',JSON.stringify(array))
    }
    
    useEffect(()=>{
        let  item = JSON.parse(localStorage.getItem('key')).includes(data._id)
        if(item){
            setSelected(true)
        }
    },[])
    
    return(
        <Stack sx={{
            backgroundColor:"#D05252",
            borderRadius:"8px",
            padding:"16px",
            width:{xs:"90vw",md:"500px"},
            color:"white",alignItems:"center",
            gap:"12px"
        }}>
            <Typography sx={{fontSize:{xs:"16px",md:"20px"}}}>{data.content}</Typography>
            <Stack sx={{flexDirection:"row",alignItems:"center",gap:"8px"}}>
            <Typography  sx={{fontSize:{xs:"12px",md:"16px"}}}>~{data.author}</Typography>
            <IconButton sx={{width:"fit-content"}}>
                    {
                        selected ? <Bookmark fontSize="16px" sx={{color:"white"}} onClick={(e)=>{
                            e.preventDefault()
                            removeItem(data._id)}}/>
                        :
                        <BookOutlined fontSize="16px" sx={{color:"white"}} onClick={(e)=>{
                            e.preventDefault()
                            addItem(data._id)}}/>
                    }
                
            </IconButton>
            </Stack>
        </Stack>
    )
}