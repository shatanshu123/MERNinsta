import React,{useState,useContext,useEffect} from  'react'
import {Link,useHistory} from 'react-router-dom'
import{Usercontext} from '../../App'
import M from 'materialize-css'



const Signin = ()=>{
    const {state,dispatch} = useContext(Usercontext)
    const history = useHistory()
    
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState(undefined)
    useEffect(()=>{
        if(url){
            uploadFields()
        }

    },[url])

    const uploadPic = ()=>{
        const data = new FormData()
    data.append("file",image)
    data.append("upload_preset","insta112")
    data.append("cloud_name","bazz001")
    fetch("https://api.cloudinary.com/v1_1/bazz001/image/upload",{
      method:"post",
      body:data
    }).then(res=>res.json())
    .then(data=>{
      setUrl(data.url)
        })
    .catch(err=>{
      console.log(err)
    })

    }
    const uploadFields = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
       fetch("/signin",{
           method:"post",
           headers:{
               "Content-Type":"application/json"
           },
           body:JSON.stringify({
               
               password,
               email
           })
       }).then(res=>res.json())
       .then(data=>{
           console.log(data)
           if(data.error){
               M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               localStorage.setItem("jwt",data.token)
               localStorage.setItem("user",JSON.stringify(data.user))
               dispatch({type:"USER",payload:data.user})
               M.toast({html:"signed in successfully",classes:"#43a047 green darken-1"})
               history.push('/')
           }
       }).catch(err=>{
           console.log(err)
       })

    }
    const PostData = ()=>{
        if(image){
            uploadPic()
        }else{
            uploadFields()

        }
        
        
    }
    return(
        <div className="mycard">
            <div className="card auth-card input-field">
            <h2>Instagram</h2>
            <input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />
            
            
              <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
              onClick={()=>PostData()}
              >
                    Login
              </button>
              <h6>
                  <Link to="/signup">Don't have an account ?</Link>
              </h6>
              <h7>
                  <Link to="/reset">Forgot Password ?</Link>
              </h7>



            
            </div>
        </div>
    )

}

export default Signin