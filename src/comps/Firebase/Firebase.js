import app from 'firebase/app';
import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import React from 'react' 
export const AppContext = React.createContext()

    const config = {
      // your config info here
      apiKey: "AIzaSyBNqOn-qUE1KbHriylJy_KWLXy8GnyC0mM",
      authDomain: "custom-ring-design.firebaseapp.com",
      databaseURL: "https://custom-ring-design.firebaseio.com",
      projectId: "custom-ring-design",
      storageBucket: "custom-ring-design.appspot.com",
      messagingSenderId: "401445854653",
      appId: "1:401445854653:web:73fe6dc4770d9a7d7946d4",
      measurementId: "G-BB39S0R1HQ"
    };
   
    class Firebase extends React.Component {
        constructor(props) {
          super(props)
          this.actions={
            updateUserAuth: this.updateUserAuth,
            loader: this.loader,
            doCreateUserWithEmailAndPassword:this.doCreateUserWithEmailAndPassword,
            doSignInWithEmailAndPassword:this.doSignInWithEmailAndPassword,
            doSignInWithGoogle:this.doSignInWithGoogle,
            doSignInWithRedirect:this.doSignInWithRedirect,
            doGetRedirectResult:this.doGetRedirectResult,
            doSignOut:this.doSignOut,
            doPasswordReset:this.doPasswordReset,
            doPasswordUpdate:this.doPasswordUpdate,
            doAddRecord:this.doAddRecord,
            doGetQueryRecord:this.doGetQueryRecord,
            getOneRecord:this.getOneRecord,
            checkState: this.checkState,
            user: this.user,
            doGetAllRecords: this.doGetAllRecords,
            doGetTaskByCustomerID: this.doGetTaskByCustomerID,
            loadFakeData: this.loadFakeData,
            
          }
          this.state = {
            test:'this is comming from the firbase context provider',
            loading: null,

            // user: null
          }
          // console.log('here')
          app.initializeApp(config);

          this.auth = app.auth();
          this.db = app.firestore()
          this.googleProvider =new app.auth.GoogleAuthProvider();
          this.auth.onAuthStateChanged(function(user) {
            if (user){
              console.log('we have a user!')
            }else{
              console.log('no user... :(')
            }    
          });
        }

        doSetState = (obj) =>{
          this.setState({...this.state, obj})
        }
        updateUserAuth = (userInfo) =>{
          // this.state.auth_user = userInfo
          // // this.state.auth_user = userInfo          
          // // this.setState({auth_user: userInfo})
        }
        doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

        doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);
        
        doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);
        
        //////////////////GOOGLE OAUTH2 REDIRECT/////////////////////
        doSignInWithRedirect = () => this.auth.signInWithRedirect(this.googleProvider);
        doGetRedirectResult = () => this.auth.getRedirectResult();

        doSignOut = () => this.auth.signOut();
        doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
        doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
        doAddRecord = (_collection) => this.db.collection(_collection).doc();
        doGetQueryRecord = (_collection, item_looking_for,filtering_item) => this.db.collection(_collection).where(item_looking_for, '==',filtering_item).get();
        getOneRecord = (_collection, item_wanted) => this.db.collection(_collection).doc(item_wanted)
        doGetTaskByCustomerID = async(_collection,id)=>{
          let task_history = [] 
          let tasks = await this.db.collection(`customers/${id}/tasks`).get()
          for(const task of tasks.docs){
            console.log('TASK----->',task.data())
            let obj = task.data()
            obj.id=task.id
            task_history.push(obj)
          }
          this.setState({...this.state, tasks_of_current_customer: task_history})
          return(task_history)
        }
          //Come back to this later---------------------------------------------------
        async doGetAllRecords(_collection){
          //get documents from 'customers' collection
          let querySnapshot = await this.db.collection(_collection).get()
          let arr = []
          //for each 'key:value pair' . . . 
          for(const doc of querySnapshot.docs){
            let data = doc.data();
            data['id'] = doc.id;
            data.task_history= []
            arr.push(data)
          }
          this.setState({...this.state, data:arr})       
        }
        checkState = async() =>{ await
          this.auth.onAuthStateChanged(function(user) {
            if (user){
              console.log('user accorfing to firebase')
            }else{
              console.log('according to firebase: no user info')
            }    
          });
        }
        user = () => this.auth.currentUser
    
        loader=()=>{          
          this.setState({...this.state, loading:true})
        }
        loadFakeData=async(collection)=>{
          try{
            const names =  [['Qabil','Fabiana'],['Fabiano','Qacha'],['Qadan','Fabiola'],['Fabrice','Qadir'],['Qadr','Fabunni'],['Facebook','Qamar']]
            // let cust = this.db.collection("customers").doc()
            // console.log('YEEET',cust.id)
            for(let name of names){
              // make a customer instance
              let cust = this.db.collection(collection).doc()
              //make data instance inside customer
              let tasks = this.db.collection(`${collection}/${cust.id}/tasks`)
              //task data fir customer
              tasks.add({
                start_date:firebase.firestore.Timestamp.fromDate(new Date("December 10, 1815")),
                end_date:firebase.firestore.Timestamp.fromDate(new Date("December 12, 1815")),
                charge:"$20.00",
                task_desc:'cleaning',
              })
              tasks.add({
                start_date:firebase.firestore.Timestamp.fromDate(new Date("August 20, 1830")),
                end_date:firebase.firestore.Timestamp.fromDate(new Date("September 1, 1830")),
                charge:"$100.00",
                task_desc:'repair',
              })    
              //customer data
              cust.set({
                first_name: name[0],
                last_name: name[1],
                phone_number: "123 321 1232",
                email_address: 'san@fake.come',
                last_in: firebase.firestore.Timestamp.fromDate(new Date("September 1, 1830")),
                recent_task: 'repair',
                notes: 'Nullam commodo eros ut commodo aliquam. Cras vestibulum accumsan bibendum. Morbi tristique massa a elit vehicula pellentesque. Nam iaculis posuere dui eu fermentum. Quisque in lectus leo. Aenean libero nunc, rutrum quis velit vel, tristique vulputate magna. Sed et lorem et lectus tempus dignissim.',
                date_purchased: firebase.firestore.Timestamp.fromDate(new Date("December 26, 1777")),
              })
            }
          }catch(e){
            console.error(e)
          }
        }
      async componentDidMount(){
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.method= 'post'    

      // STUFF YOU DO RIGHT AT THE BEGINING 
      }
        render(){
          console.log('context state is:',this.state)
          return(
            <AppContext.Provider value={{...this.state, ...this.actions }}>
              {this.props.children}
            </AppContext.Provider>
          )
        }
        
    }
export default Firebase;
