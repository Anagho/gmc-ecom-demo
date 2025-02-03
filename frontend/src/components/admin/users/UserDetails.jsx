import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { serverUrl } from "../../../utils/helper";
import moment from "moment";
import BackButton from "../../ui/buttons/BackButton";

const UserDetails = () => {
    const params = useParams();
    const [userInformation, setUserInformation] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getUserDetails() {
        setLoading(true);
        try {
          const response = await axios.get(
            `${serverUrl}/user/user-info/single-info/${params.user_id}`
          );

          console.log(response.data.data)
        //   setUserInformation(response.data.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
    }

     useEffect(() => {
       getUserDetails();
     }, []);

       if (loading) {
         return (
           <div className="flex items-center justify-center h-screen bg-gray-100">
             <h1 className="text-4xl text-gray-600 font-semibold animate-pulse">
               Loading user details...
             </h1>
           </div>
         );
       }
  return <div>UserDetails</div>;
};

export default UserDetails;
