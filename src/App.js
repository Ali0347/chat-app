import './App.css';
import { useEffect, useState } from 'react';
import { getDatabase, push, ref, set, onChildAdded } from "firebase/database";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

function App () {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser({ name: result.user.displayName, email: result.user.email })
        // IdP data available using getAdditionalUserInfo(result)
        console.log(token, user);

      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

  }


  const [user, setUser] = useState('');
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState('');


  const db = getDatabase();
  const chatListRef = ref(db, 'chats');



  const updateHeight = () => {
    const el = document.getElementById('chat');
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }

  useEffect(() => {
    onChildAdded(chatListRef, (data) => {
      setChats(chats => [...chats, data.val()])
      setTimeout(() => {
        updateHeight()

      }, 100)
    });
  }, [])

  const sendChat = () => {
    const chatRef = push(chatListRef);
    set(chatRef, { user: user, messege: msg });
    setMsg("")
  
   
  }

 

  return (
    <div>
      {user.email ? null : <div className='text-center mt-5 pt-5'>
        <h1 className='text-dark'>
          Developed by :
          <span className='text-muted'> Ali Bahadur &copy;</span></h1>
        <div className='border mt-5 mb-5 pb-5'>
          {/* <input type="text" placeholder='Enter Your Name ' onBlur={(e) => setName(e.target.value)}/> */}
          <a  onClick={(e) => { googleLogin() }} className='button text-light btn fs-5 mt-5 btn-outline-light bg-primary  '> Google SignIn</a>
        </div>
        <p className='  mt-5 text-primary btn fs-5 btn-outline-primary bg-light'>This is a simple <span className='text-danger '>Chat App</span> 💖 where you can chat together  ✔✔🏆</p>
      </div>}

      {user.email ? <div>
        <h1 className='text-end me-5 mt-3 mb-0 bg-dark text-light p-3 '>User: {user.name}</h1>
        <div id="chat" className='chat-container  ms-1 me-3 mt-3'>
          {chats.map((c, i) => {
            return <div key={i} className={`container ${c.user.email === user.email ? "me" : ''}`}>
              <p className='chat-box'>
                <strong>{c.user.name}:</strong>
                <span> {c.messege}</span>
              </p>
            </div>
          })}
        </div>

      </div> : null}

      <div className='btm '>
        <input className='ms-1 ps-2 '  type="text" value={msg} onInput={(e) => { setMsg(e.target.value) }} placeholder='Enter your messege' />
        <button className='me-1 ms-1 px-3 py-0 text-success bg-light fs-bold ' onClick={e => { sendChat() }}> Send</button>
      </div>

    </div>
  );
}

export default App;
