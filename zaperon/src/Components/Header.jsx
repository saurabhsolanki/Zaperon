import { ThemeProvider } from '@emotion/react';
import { Avatar, Box, Container, CssBaseline, Typography, createTheme } from '@mui/material';
import React from 'react'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useSelector } from 'react-redux';



const theme = createTheme({
    success: {
        dark: '#009688',
      },
});

const Header = () => {
    const {token,username,error,loading} = useSelector((store) => store.auth);
  return (
    <div>
      <ThemeProvider  theme={theme}>
      <Container component="main" maxWidth="xs">
      <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        
        <Avatar sx={{ m: 2, bgcolor: '#efefef', color:'#003fb9',height:"100px" , width:"100px"}}>
            <PersonOutlineOutlinedIcon  sx={{fontSize:"50px"}}/>
          </Avatar>
          <Typography component="h1" variant="h4" sx={{fontWeight: 'medium' }} >
            Welcome!
          </Typography>

        {
            username?username:<>
                <Typography sx={{fontSize: '13px', textAlign:'centre'}}>
                Let's connect to your workspace.
                </Typography>
                <Typography sx={{fontSize: '13px', textAlign:'centre'}}>
                Please enter your email to continue.
                </Typography>
            </>
        }



        </Box>
      </Container>

      </ThemeProvider>
    </div>
  )
}

export default Header
