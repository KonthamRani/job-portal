import { doc, setDoc ,getDoc} from 'firebase/firestore';
import React, { useContext, useState, useEffect } from 'react'
import { CircularProgress, Grid, TextField, Button } from '@mui/material'
import DropDown from '../../common/DropDown/DropDown'
import FileUpload from '../../common/FileUpload/FileUpload'
import './Profile.css'
import SearchDropDown from '../../common/SearchDropDown/SearchDropDown'
import { skills, experience, primaryRole } from '../../../Content/index'
import { UserContext } from '../../../context/UserContext'
import { db } from "../../../FireBaseConfig/FireBaseConfig"
import { useNavigate } from 'react-router-dom';
import toastMessage from '../../../Util/toastMessages'
import FormLoading from '../../common/FormLoading/FormLoading'
const CandidateProfile = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false);
  const [screenLoading, setScreenLoading] = useState(true);
  const [userData, dispatch] = useContext(UserContext)
  const navigate = useNavigate();
  const [userInformation, setUserInformation] = useState({
    name: userData.user.displayName,
    email: userData.user.email,
    phone: "",
    location: "",
    primaryRole: "",
    skills: [],
    linkedIn: "",
    experience: "",
    bio: "",
    resume: ""
  })
  useEffect(() => { console.log("resume value is uploaded") }, [userInformation.resume])
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

  const handleSkills = (data, type) => {
    console.log(userData);
    if (type === 'delete') {
      let new_data = userInformation.skills.filter((skill) => skill !== data)
      setUserInformation({ ...userInformation, skills: new_data });
    }
    else {

      if (userInformation.skills.find(skill => skill === data)) { }
      else {

        let new_data = [...userInformation.skills, data];
        setUserInformation({ ...userInformation, skills: new_data })
      }
    }

  }
  const submit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(userInformation);
    try {
      await setDoc(doc(db, 'users', userData.user.email)
        ,
        {
          ...userInformation,
          userType: 'candidate'
        })
      setLoading(false)
      toastMessage('Data Updated Successfully', "success")
      // navigate('/candidate/profile')
    }
    catch (e) {
      console.log(e);
      toastMessage("Updating failed", "danger")
      setLoading(false)
    }
    setIsEdit(false)
  }
  return screenLoading?(<div><FormLoading fields={10}
  height={100}/></div>):
    (<form onSubmit={e => { submit(e) }}>

      <Grid container spacing={2} className='onboarding-container'>
        <Grid item xs={12} className='submit-btn-candidate'>
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
          <label className='onboarding-label'>Name</label>
          <TextField required id='outlined-basic' variant='outlined'
            disabled={!isEdit} fullWidth
            value={userInformation.name}
            onChange={(e) => setUserInformation({ ...userInformation, name: e.target.value })} />
        </Grid>
        <Grid item xs={12} md={6}>
          <label className='onboarding-label'>Email</label>
          <TextField disabled id='outlined-basic' variant='outlined' fullWidth
            type={"email"}
            value={userInformation.email}
            onChange={(e) => setUserInformation({ ...userInformation, email: e.target.value })} />
        </Grid>
        <Grid item xs={12} md={6}>
          <label className='onboarding-label'>Phone</label>
          <TextField id='outlined-basic' variant='outlined' fullWidth
            value={userInformation.phone} disabled={!isEdit}
            onChange={(e) => setUserInformation({ ...userInformation, phone: e.target.value })} />
        </Grid>
        <Grid item xs={12} md={6}>
          <label className='onboarding-label'>location</label>
          <TextField id='outlined-basic' variant='outlined' fullWidth
            value={userInformation.location} disabled={!isEdit}
            onChange={(e) => setUserInformation({ ...userInformation, location: e.target.value })} />
        </Grid>
        <Grid item xs={12} md={6}>
          <label className='onboarding-label'>Primary Role</label>
          <DropDown required={true} disabled={!isEdit} options={primaryRole} onChange={(data) => setUserInformation({ ...userInformation, primaryRole: data })} value={userInformation.primaryRole} />
        </Grid>
        <Grid item xs={12} md={6}>
          <label className='onboarding-label'>linkedIn</label>
          <TextField id='outlined-basic' variant='outlined' fullWidth
            value={userInformation.linkedIn} disabled={!isEdit}
            type={"url"}
            onChange={(e) => setUserInformation({ ...userInformation, linkedIn: e.target.value })} />
        </Grid>
        <Grid item xs={12} md={6}>
          <label required={true} className='onboarding-label'>experience</label>
          <DropDown options={experience} disabled={!isEdit} onChange={(data) => setUserInformation({ ...userInformation, experience: data })} value={userInformation.experience} />

        </Grid>
        <Grid item xs={12} md={6}>
          <label className='onboarding-label'>bio</label>
          <TextField id='outlined-basic' disabled={!isEdit} variant='outlined' fullWidth
            value={userInformation.bio}
            onChange={(e) => setUserInformation({ ...userInformation, bio: e.target.value })} />
        </Grid>
        <Grid item xs={12} md={6}>
          <label className='onboarding-label'>Skills</label>
          <SearchDropDown required={true} options={skills}
            onChange={(data) => handleSkills(data, 'add')}
            disabled={!isEdit}
            onDelete={data => handleSkills(data, 'delete')}
            values={userInformation.skills} />
        </Grid>
        <Grid item xs={12}>
          <FileUpload
            required={true}
            fileType={'doc'}
            value={userInformation.resume}
            disabled={!isEdit}
            onUpload={(url) => {
              console.log(url)
              setUserInformation({ ...userInformation, resume: url })
            }}
          />
        </Grid>


      </Grid>
    </form>)
  
}

export default CandidateProfile
