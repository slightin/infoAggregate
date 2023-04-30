// import axios from "axios"

function resetapi(url) {
    return url.replace(/^.*\/api/, '/api')
}
// 浮点数最大位数为2，但不强制写0
function changeTwoDecimal(x) {
    let f_x = parseFloat(x);
    if (isNaN(f_x)) {
        return NaN;
    }
    f_x = Math.round(f_x * 100) / 100;

    return f_x;
}


// function getaxios(url){
//     axios.get(url).then(response=>{
//         return response
//     }).catch(error=>{console.log(error)})
// }

// function postaxios(url){

// }
export {
    resetapi,
    changeTwoDecimal
}