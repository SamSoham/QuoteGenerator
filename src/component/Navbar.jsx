import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function Navbar(){
    const navigate = useNavigate()
    return(
        <Stack sx={{flexDirection:"row",justifyContent:"space-between",width:"100%",marginBottom:"16px"}}>
            <Typography sx={{fontSize:"20px",color:"white",cursor:"pointer"}} onClick={()=>navigate('/')}>Home</Typography>
            <Typography sx={{fontSize:"20px",color:"white",cursor:"pointer"}} onClick={()=>navigate('/bookmark')}>Bookmarks</Typography>
        </Stack>
    )
}