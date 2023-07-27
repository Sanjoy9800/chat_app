import React, { useContext, useState } from "react";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);


  const {currentUser}= useContext(AuthContext)

  const hadelSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setErr(true);
    }
  };

  const handelKey = (e) => {
    e.key === "Enter" && hadelSearch();
  };


  const handelSelect= async ()=>{
    //check whether the group(chats collection in firestore) exists. if not create a new one
    const combinedId=currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

    try {

      //create a chat from chats collection
      const res = await getDoc(doc(db, "chats", combinedId));
      if(!res.exists()){
        await setDoc(doc (db, "chats", combinedId), {messages:[]})
        
      //create a user chat
     
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combinedId + ".userInfo"]: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", user.uid), {
        [combinedId + ".userInfo"]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
       
      }
    } catch (error) {}
    
    // creates user chats
    setUser(null);
    setUsername("")
  };

  return (
    <div className="search">
      <div className="serachform">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handelKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="userchat"  onClick={handelSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userchatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
