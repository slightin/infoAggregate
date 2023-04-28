import axios from "axios"

function resetapi(url) {
    return url.replace(/^.*\/api/, '/api')
}

// function getaxios(url){
//     axios.get(url).then(response=>{
//         return response
//     }).catch(error=>{console.log(error)})
// }

// function postaxios(url){
    
// }
export default resetapi