// var firebase = require('firebase');



(function (){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAejy37NPoM-mlG4JYV63SG38KC_FQT5ZM",
    authDomain: "testproject-73caf.firebaseapp.com",
    databaseURL: "https://testproject-73caf.firebaseio.com",
    projectId: "testproject-73caf",
    storageBucket: "testproject-73caf.appspot.com",
    messagingSenderId: "669484164250"
  };
  firebase.initializeApp(config);

//Create references
const dbRefObject = firebase.database().ref().child('object');

//Sync object changes
dbRefObject.on('value', snap => console.log(snap.val()));


  // Get elements
  const txtEmail = document.getElementById("txtEmail");
  const txtPassword = document.getElementById("txtPassword");
  const btnLogIn = document.getElementById("btnLogIn");
  const btnSignUp = document.getElementById("btnSignUp");
  const btnLogout = document.getElementById("btnLogout");
  firebase.auth().onAuthStateChanged( user => {
      if (user) {
          console.log("user is signed in");
      }else{
          console.log("user is not signed in");
      }
  })

  //Add login even
  btnLogIn.addEventListener("click", e => {
    e.preventDefault();
    //Get email and pass
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.then( data => console.log(data));
    promise.catch(e => console.log(e.message));
  });

  //Add signup even
  btnSignUp.addEventListener("click", e => {
    e.preventDefault();
    //Get email and pass
    //TODO: CHECK FOR REAL EMAIL 
    const email = txtEmail.value;
    const pass = txtPassword.value;
    console.log("password is ", pass);
    const auth = firebase.auth();
    //Sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.then( data => alert(data)  ); 
    promise.catch(e => console.log(e.message));

  });

  btnLogout.addEventListener("click", e => {
    e.preventDefault();

    firebase.auth().signOut();
    
  })


  //Add a realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser) {
          console.log(firebaseUser);
          btnLogout.classList.remove("hide");
      } else { 
          console.log("not logged in");
      }
  });

}());