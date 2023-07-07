export default function UserProfilePage({params}:any){
    return(
        <div className=" flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <p className=" text-4xl m-4">Profile page</p> 
            <span className=" p-2 rounded bg-red-300">
            {params.id}
            </span>
            

        </div>
    )
}