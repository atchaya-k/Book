import jwt, { decode }  from "jsonwebtoken";

const Auth=async (req,res,next)=>{
    try {
        //to check if authorized get token from front
        const token=req.headers.authorization.split(" ")[1]
        //to decide ggogle or manual token(less than 500)
        const isCustomeAuth=token.length < 500
        //data from token
        let decodedData;
        if(token && isCustomeAuth){
            decodedData=jwt.verify(token,'secret')
            //get their id
            req.userId=decodedData?.id
        }
        else{
            decodedData=jwt.decode(token)
            //sub is google id that differntiated user
            req.userId=decodedData?.sub
        }
        next()
    } catch (error) {
       console.log(error)
    }
}

export default Auth;