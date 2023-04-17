import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CircularProgress from '@mui/material/CircularProgress';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IconButton, InputAdornment } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { LoginApi } from '../Redux/auth/action';
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';



const theme = createTheme({
    success: {
        dark: '#009688',
      },
});

export default function SignIn() {
  const {token,username,error,loading} = useSelector((store) => store.auth);
  const [pLength,setPLength]=React.useState(true)
  const navigate=useNavigate()
  const dispatch=useDispatch()
      const [values, setValues] = React.useState({
          email: "",
          password: "",
          showPass: false,
        });



  const handleSubmit = (event) => {
    event.preventDefault();
    if(values.password.length<8){
     return setPLength(!pLength)
    }
    dispatch(LoginApi(values,navigate))
  };

    const handlePassVisibilty = () => {
    setValues({
      ...values,
      showPass: !values.showPass,
    });
  };

  const handleChange=(e)=>{
    const {name,value}=e.target
    setValues({...values,[name]:value})
  }

  React.useEffect(()=>{

  },[username,token])

  return (
    <>

      <ThemeProvider theme={theme}>
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
          {/* <Avatar sx={{ m: 2, bgcolor: '#efefef', color:'#003fb9',height:"100px" , width:"100px"}}>
            <PersonOutlineOutlinedIcon  sx={{fontSize:"50px"}}/>
          </Avatar>
          <Typography component="h1" variant="h4" sx={{fontWeight: 'medium' }} >
            Welcome!
          </Typography>
          <Typography sx={{fontSize: '13px', textAlign:'centre'}}>
          Let's connect to your workspace.
          </Typography>
          <Typography sx={{fontSize: '13px', textAlign:'centre'}}>
          Please enter your email to continue.
          </Typography> */}

          <Header/>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              onChange={handleChange}
              label="Email Address"
              name="email"
              autoComplete="email"
              helperText={error?error:""}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={handleChange}
              name="password"
              label={pLength===false?"Error":"Password"}
              helperText={pLength===false?"Password must be 8 Character long.":""}
              type={values.showPass ? "text" : "password"}
              id={pLength===false?"outlined-error-helper-text":"Password"}
              color={pLength===false?"error":"primary"}
              InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handlePassVisibilty}
                            aria-label="toggle password"
                            edge="end"
                          >
                            {values.showPass ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {
                loading?<CircularProgress color="inherit"/>:"Sign In"
              }
            </Button>
            <Grid container>
              <Grid item xs>
                
              </Grid>
              <Grid item>
              <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    



    </>
  );
}
