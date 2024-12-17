

export default async function forgetpassword(email :string){
    const URL = process.env.NEXT_PUBLIC_API_URL;
    try {
        const response = await fetch(`${URL}api/v1/auth/forgetpassword`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(email),
        });
        const data = await response.json();
        if (response.ok) {
          return "A reset link has been sent to your email"
        }else{
           return data.message; 
        }
      } catch (error) {
        console.log("something went wrong", error);
      }
}