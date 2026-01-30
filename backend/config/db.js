const { default: mongoose } = require("mongoose")


const connectdb=async ()=>{
    try {
        let res=await mongoose.connect("mongodb://0.0.0.0/mern")
        if(res){
            console.log("connected succesfully")
        }
    } catch (error) {
        console.log("error in mongodb",error)
    }
}

module.exports=connectdb