import jwt from 'jsonwebtoken'

// admin authentication middleware
const authUser = async (req,res,next)=>{
    try {
        
        const {token} = req.headers
        if(!token){
            return res.json({success:false,message:"Not authorised login again"})
        }

        const token_Decode = jwt.verify(token,process.env.JWT_SECRET)
       
        req.body.userId = token_Decode.id

        next()
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


export default authUser