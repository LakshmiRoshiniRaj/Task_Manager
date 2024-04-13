const login = async(emailId,password) => {
    var users = await fetch('./data.json').then((response) => {
        console.log('success')
        return response.json()
    });
    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            var user = users.AllUser.find(
                (user)=>user.password === password && user.email === emailId
            );
            if(user){
                resolve(user)
            }else{
                reject(new Error("Invalid email or password"))
            }
        },1000);
    })
}
document.getElementById('submitform').addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.querySelector("#emailId").value;
  const password = document.querySelector("#password").value;
  try{
    let user = await login(email,password)
    console.log("Logined as",user);
    if(user){
        window.location.href="day1.html"
    }
  }catch(error){
     console.error("Login Error:",error.message);
  }
})