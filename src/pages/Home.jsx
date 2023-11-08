import { Alert, Backdrop, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Snackbar, Stack} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllpost,
  getPostError,
  fetchPosts,
  selectPostLoading,
} from "../features/post/postSlice";
import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import PostCard from "../component/PostCard";
import Navbar from "../component/Navbar";

export default function Home() {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllpost);
  const isLoading = useSelector(selectPostLoading);
  const error = useSelector(getPostError);
  const [open,setOpen] = useState(false)
  const [tag, setTag] = useState("");
  const [tagList,setTagList] = useState([])
  const [refetch, setRefetch] = useState(false);

  async function getTag(){
   await axios.get("https://api.quotable.io/tags").then((res)=>setTagList(res.data))
  }

  function handleChange(e){
    setTag(e.target.value)
  }

  useLayoutEffect(() => {
    dispatch(fetchPosts(tag));
  }, [refetch]);

  useEffect(()=>{
    getTag()
    if(error){
        setOpen(true)
    }
  },[error])

  return (
    <Stack 
        sx={{
            background:'#161E6C',
            minHeight:"100vh",
            alignItems:"center",
            padding:"16px"
        }}
    >
        <Navbar/>
        <Backdrop sx={{color:"#fff",zIndex:'1'}} open={isLoading}>
            <CircularProgress color="inherit"/>
        </Backdrop>
      <Snackbar
            open={open}
            onClose={()=>setOpen(false)}
            autoHideDuration={4000}
            >
                <Alert severity="warning" onClose={()=>setOpen(false)}>{error}</Alert>
            </Snackbar>
        <Stack direction="row" margin="16px" gap="16px">
            <FormControl sx={{width:"150px"}}>
                <InputLabel sx={{color:"white",backgroundColor:"#161E6C"}}>Tag</InputLabel>
                <Select
                    value={tag}
                    onChange={handleChange}
                    sx={{
                        color:"white",
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white'
                        },
                        '& .MuiSvgIcon-root': {
                            color: 'white'
                        }
                    }}
                >
                    {
                        tagList?.map((x)=>(
                            <MenuItem key={x._id} value={x.name}>{x.name}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            <Button
             onClick={(e) => {
                e.preventDefault();
                setRefetch(!refetch);
              }}
              sx={{
                backgroundColor:"#009C51",
                padding:"8px",
                borderRadius:"8px",
                width:"180px",
                color:"white"
              }}
            >
                Next Quote
            </Button>
        </Stack>
     <Stack gap="12px">
     {posts?.map((x) => (
        <PostCard data={x} key={x._id}/>
      ))}
     </Stack>
    </Stack>
  );
}
