// import Main from "../../utils/Main";
// import React, { useState } from "react";

// import axios from "axios";

// interface bonType {
    
// }
// const Bon = () => {
//   const [data, setData] = useState<userType[]>([]);
//   React.useEffect(() => {
//     axios.get(import.meta.env.VITE_Main_ENDPOINT + "client",
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       }
//     )
//       .then((response) => response.data)
//       .then((data) => setData(data));
//   }, []);
//   return (
//     <div className="w-full ">
//       <div className="w-full pl-[4%] text-3xl font-medium mb-[30px] mt-[36px] ">
//         Liste des clients
//       </div>
//       <Main data={data} />
//     </div>
//   );
// };

// export default Bon;
