import React, { useContext, useState,useEffect } from 'react'
import { Grid, TextField,Button,CircularProgress} from '@mui/material'
import DropDown from'../../common/DropDown/DropDown'
import FileUpload from '../../common/FileUpload/FileUpload'
import './Profile.css'
import  SearchDropDown  from '../../common/SearchDropDown/SearchDropDown'
import {skills,experience,primaryRole,industry_type,company_size} from '../../../Content/index'
import {UserContext} from '../../../context/UserContext'
import {db} from "../../../FireBaseConfig/FireBaseConfig"
import { useNavigate } from 'react-router-dom';
import toastMessage from '../../../Util/toastMessages'
import {doc,setDoc,getDoc} from 'firebase/firestore';
import FormLoading from '../../common/FormLoading/FormLoading'
const EmployerProfile = () => {
  const [screenLoading, setScreenLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(true);
  const [loading,setLoading]=useState(false);
  const [userData,dispatch]=useContext(UserContext)
  const [userInformation, setUserInformation] = useState({
    name: userData.user.displayName,
    employer_email: userData.user.email,
    phone: "",
    location: "",
    industry_type: "",
    company_size:"",
    role:"",
    website:"",
    company_name:"",
    company_tag:"",
    company_bio:"",
    company_logo:""
   
  })
  const navigate=useNavigate();

  const fetchData=async ()=>{
    const docRef=doc(db,"users",userData.user.email);
    const docSnap=await getDoc(docRef);
    if(docSnap.exists()){
      console.log("Data",docSnap.data())
      setUserInformation(docSnap.data())
      setScreenLoading(false)
    }
    else{
      console.log("Data is not found")
      setScreenLoading(false)
    }
  }

  useEffect(()=>{
    setScreenLoading(true)
    fetchData()},[])

  const handleSkills=(data,type)=>{
    console.log(userData);
    if(type==='delete')
    {
      let new_data=userInformation.skills.filter((skill)=>skill !== data)
      setUserInformation({...userInformation,skills:new_data});
    }
    else{

      if(userInformation.skills.find(skill=>skill===data)){}
      else{
  
        let new_data=[...userInformation.skills,data];
        setUserInformation({...userInformation,skills:new_data})
      }
    }
    
  }
  
  const submit=async (e)=>{
    setLoading(true);
    e.preventDefault();
    console.log(userInformation);
    try{
    await setDoc(doc(db,'users',userData.user.email)
    ,
    {...userInformation,
    userType:'employer'})
    setLoading(false)
    toastMessage('Data Updated Successfully',"success")
    // navigate('/employer/profile')
    }
    catch(e){
      console.log(e);
      toastMessage("Updating failed","danger")
      setLoading(false)
    }
    setIsEdit(false)
  }
  return screenLoading?(<div><FormLoading fields={10}
    height={100}/></div>):
    (<form onSubmit={e=>{submit(e)}}>

    <Grid container spacing={2} className='onboarding-container'>
    <Grid item xs={12} className='submit-btn-employer'>
          <div>

            {
              loading ?
                (<button type='button'>
                  <CircularProgress />
                </button>)
                : (
                  <div>
                   { isEdit?(
                    <div style={{display:"flex"}}>
                     <Button type="button"
                     style={{backgroundColor:"red",marginRight:"10px"}} onClick={()=>{setIsEdit(false)}} >Cancel</Button>
                     <Button type="submit" >Save</Button>
                     </div>
                     ):
                     <Button type="button" onClick={()=>{setIsEdit(true)}}>Edit</Button>}
                  </div>
                 )
            }
          </div>
          <Button type="button">Log Out</Button>
        </Grid>
      <Grid item xs={12} md={6}>
        <label className='onboarding-label'>Company Name</label>
        <TextField required id='outlined-basic' variant='outlined' fullWidth
          value={userInformation.company_name} disabled={!isEdit}
          onChange={(e) => setUserInformation({ ...userInformation, company_name: e.target.value })} />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <label className='onboarding-label'>Phone</label>
        <TextField id='outlined-basic' variant='outlined' fullWidth
          value={userInformation.phone} disabled={!isEdit}
          onChange={(e) => setUserInformation({ ...userInformation, phone: e.target.value })} />
      </Grid>
      <Grid item xs={12} md={6}>
        <label className='onboarding-label'>Industry Type</label>
       <DropDown required={true} disabled={!isEdit} options={industry_type} onChange={(data)=>setUserInformation({...userInformation,industry_type:data})} value={userInformation.industry_type}/>
      </Grid>
      <Grid item xs={12} md={6}>
        <label className='onboarding-label'>Company Size</label>
       <DropDown required={true} disabled={!isEdit} options={company_size} onChange={(data)=>setUserInformation({...userInformation,company_size:data})} value={userInformation.company_size}/>
      </Grid>
       <Grid item xs={12} md={6}>
        <label className='onboarding-label'>Email</label>
        <TextField disabled id='outlined-basic' variant='outlined' fullWidth
          type={"email"}
          value={userInformation.employer_email}
          onChange={(e) => setUserInformation({ ...userInformation, employer_email: e.target.value })} />
      </Grid> 
      <Grid item xs={12} md={6}>
        <label className='onboarding-label'> Name</label>
        <TextField required id='outlined-basic' disabled={!isEdit} variant='outlined' fullWidth
          value={userInformation.name}
          onChange={(e) => setUserInformation({ ...userInformation, name: e.target.value })} />
      </Grid>
      <Grid item xs={12} md={6}>
        <label className='onboarding-label'> Role</label>
        <TextField required id='outlined-basic' disabled={!isEdit} variant='outlined' fullWidth
          value={userInformation.role}
          onChange={(e) => setUserInformation({ ...userInformation, role: e.target.value })} />
      </Grid>
      <Grid item xs={12} md={6}>
        <label className='onboarding-label'> location</label>
        <TextField required id='outlined-basic' disabled={!isEdit} variant='outlined' fullWidth
          value={userInformation.location}
          onChange={(e) => setUserInformation({ ...userInformation, location: e.target.value })} />
      </Grid>
    
      
      <Grid item xs={12} md={6}>
        <label className='onboarding-label'>website</label>
        <TextField id='outlined-basic' disabled={!isEdit} variant='outlined' fullWidth
          value={userInformation.website}
          type={"url"}
          onChange={(e) => setUserInformation({ ...userInformation, website  : e.target.value })} />
      </Grid>
     
      <Grid item xs={12} md={6}>
        <label className='onboarding-label'>Company Tagline</label>
        <TextField id='outlined-basic' disabled={!isEdit} variant='outlined' fullWidth
          value={userInformation.company_tag}
          onChange={(e) => setUserInformation({ ...userInformation, company_tag: e.target.value })} />
      </Grid>
      <Grid item xs={12} >
        <label className='onboarding-label'>Bio</label>
        <TextField id='outlined-basic' disabled={!isEdit} variant='outlined'
        multiline
        minRows={4}
        fullWidth
          value={userInformation.company_bio}
          onChange={(e) => setUserInformation({ ...userInformation, company_bio: e.target.value })} />
      </Grid>
      
      <Grid item xs={12}>
         {/* <FileUpload
        required={true}
        fileType={'image'}
        value={userInformation.company_logo} disabled={!isEdit}
        onUpload={(url)=>setUserInformation({...userInformation,company_logo:url})}
        />  */}
      </Grid>

    </Grid>
    </form>)
  
}

export default EmployerProfile
