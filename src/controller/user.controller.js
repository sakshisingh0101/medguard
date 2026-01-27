
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const generateAccessAndRefreshToken =async(userId)=>{
  const user=await User.findById(userId);
  const accessToken=await user.generateAccessToken()
  const refreshToken=await user.generateRefreshToken();
  user.refreshToken=refreshToken;
  user.save({validateBeforeSave: false})
  return {accessToken,refreshToken};

}
const registeration= asyncHandler(async(req,res)=>{
    const { fullName , email , password} = req.body
    if(fullName.trim()===""|| email.trim()===""||password.trim()==="")
    {
        throw new ApiError(401 , "ALL FIELDS ARE RQUIRED");
    }
    if(!email.includes('@'))
    {
        throw new ApiError(401,"Invalid Email")
    }
    const user = await User.create({
        fullName,
        email,
        password
    })
    if(!user)
    {
        throw new ApiError(500,"Internal server error : user not created");
    }
    const {accessToken , refreshToken} = await generateAccessAndRefreshToken(user._id);
    const option =
  process.env.NODE_ENV === "production"
    ? {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      }
    : {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
      };


    const usercreated=await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!usercreated)
    {
        throw new ApiError(500,"Internal Server Error: user creation failed")
    }

    console.log("success")

    return res.status(201)
    .cookie("accessToken",accessToken,option)
    .cookie("refreshToken",refreshToken,option)
    .json(new ApiResponse(201,"Successfully registered",usercreated));





})
const login = asyncHandler(async(req,res)=>{
    const {email , password} = req.body;
    if(email.trim()===""||password.trim()==="")
    {
       throw new ApiError(400,"Enter all the fields")
    }
    if(!email.includes('@'))
    {
        throw new ApiError(401,"Invalid Email")
    }
    const existeduser = await User.findOne({
        $or:[{email}]
    })
    if(!existeduser)
    {
        throw new ApiError(401, "User with this email does not exist")
    }
    const ispasswordcorrect = await existeduser.isPassword(password)
    if(!ispasswordcorrect)
    {
        throw new ApiError(401 , "Invalid password")
    }

    const {accessToken , refreshToken} = await generateAccessAndRefreshToken(existeduser._id);
    const option =
  process.env.NODE_ENV === "production"
    ? {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      }
    : {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
      };


    const usercreated=await User.findById(existeduser._id).select(
        "-password -refreshToken"
    )

    if(!usercreated)
    {
        throw new ApiError(500,"Internal Server Error: user login failed")
    }

    console.log("success")

    return res.status(201)
    .cookie("accessToken",accessToken,option)
    .cookie("refreshToken",refreshToken,option)
    .json(new ApiResponse(201,"Successfully login",usercreated));


})

const logoutUser=asyncHandler(async(req,res)=>{
    // cookie remove refreshToken update
   const user= await User.findByIdAndUpdate(req.user._id,
        {
        $set:{
            refreshToken:undefined
        }
       
        },
        {
            new : true
        }
)

res.status(200)
.clearCookie("accessToken")
.clearCookie("refreshToken")
.json(
    new ApiResponse(200,"Logged Out Successfully",{
        data:user
    })
)
})
export const getCurrentUser = async (req, res) => {
  return res.status(200).json({
    user: req.user,
  });
};



export {registeration,login,logoutUser};

    
