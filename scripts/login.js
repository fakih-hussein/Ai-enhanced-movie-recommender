document.getElementById('show-register').addEventListener('click',()=>{
    document.getElementById('login-form-container').style.display='none';
    document.getElementById('register-form-container').style.display='block';

});

document.getElementById('show-login').addEventListener('click',()=>{
    document.getElementById('login-form-container').style.display='block';
    document.getElementById('register-form-container').style.display='none';
});


// login Form Submission
const loginForm=document.getElementById('login-form');
console.log(loginForm);
loginForm.addEventListener('submit' ,async(event)=>{
    event.preventDefault();
    const email=document.getElementById('login-email').value;
    console.log(email);
    const password=document.getElementById('login-password').value;
    if(!email || !password) return;
   
     try{
           const response= await fetch('./server/login.php',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email,password})

           });

           const result= await response.json();
           if(result.success){
            window.location.href='chatbot.html';

           }else{
            alert(result.message);
           }

     }catch(error){
        console.error('Error:',error);
        alert('An error occured.Please try again');

     }
 

});

const registorForm=document.getElementById('register-form');
registorForm.addEventListener('click', async(event)=>{
    event.preventDefault();
    const username=document.getElementById('register-username').value;
    console.log(username);
    const email=document.getElementById('resgister-email').value;
    console.log(email);
    const password=document.getElementById('register-password').value;

    if (!username || !email || !password) return;
    try{
        const response= await fetch('./server/registor.php',{
            method:'POST',
            headers:{'Content-Type' : 'application/json'},
            body:JSON.stringify({username,email,password})
        });
         
        const result= await response.json();
        if(result.success){
            alert('Registration sucessful ');
            document.getElementById('show-login').click();

        }else{
            alert(result.message);
        }

    }catch(error){
        console.log('error:',error);
        alert('An error occurred please try again');
    }
});


