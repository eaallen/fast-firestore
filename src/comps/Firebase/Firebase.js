import app from 'firebase/app';
import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import React from 'react' 
import axios from 'axios'
import produce from 'immer'
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
      measurementId: "G-BB39S0R1HQ",
    };
    const secondary_config = {
      apiKey: "AIzaSyBNqOn-qUE1KbHriylJy_KWLXy8GnyC0mM",
      authDomain: "custom-ring-design.firebaseapp.com",
      databaseURL: "https://custom-ring-design.firebaseio.com",
      projectId: "custom-ring-design",
      storageBucket: "custom-ring-design.appspot.com",
      messagingSenderId: "401445854653",
      appId: "1:401445854653:web:7aebdf9d897da9047946d4",
      measurementId: "G-0V6YPGB45G"
    }
   
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
          pushDataToFirestore: this.pushDataToFirestore,
          doSetState: this.doSetState,
          push_dataset_to_obj: this.push_dataset_to_obj,
          pushDataWithSubCollectionToFirestore: this.pushDataWithSubCollectionToFirestore,
          doSetStateArray:this.doSetStateArray,
          add_data_to_super_ds: this.add_data_to_super_ds,
          add_meta_data_to_super_ds: this.add_meta_data_to_super_ds, 
          init_super_ds: this.init_super_ds,
          add_sub_coll_setting_tp_super_ds: this.add_sub_coll_setting_tp_super_ds,
          delete_dataset: this.delete_dataset,
          create_dataset: this.create_dataset,
          remove_a_sub_coll_setting: this.remove_a_sub_coll_setting,
        }
        this.state = {
          test:'this is comming from the firbase context provider',
          loading: null,
          up_loading: null,
          dataset_obj: {},
          dataset_info_obj: {},
          sub_coll_setitngs: {}, 
          arr_settings: [],
          super_ds: {},
        }
        // console.log('here')
        var defaultProject = firebase.initializeApp(config);
        let sec = firebase.initializeApp(secondary_config, "testing_only");
        console.log(sec.name)
        this.secondaryDatabase = sec.firestore();
         // var sec = firebase.initializeApp(secondary_config, "secondary");
        console.log(firebase.app().name);  // "[DEFAULT]"
        this.auth = firebase.auth();
        this.db = firebase.firestore()
        // this.googleProvider =new app.auth.GoogleAuthProvider();

        // secoudary config database connection
        // console.log('secoundary', secondary)
        // console.log('default' )
        // this.secondaryDatabase = sec.firestore();


        this.auth.onAuthStateChanged(function(user) {
          if (user){
            console.log('we have a user!')
          }else{
            console.log('no user... :(')
          }    
        });
      }
      //call this method when connecting to another firebase app
      initializeOtherApp = async(otherConfig) =>{
        
      }
      init_super_ds = (name) =>{
        this.setState(state=> produce(state, draft=>{
          draft.super_ds[name] = {sub_collection_settings:{}}
        }))

      }
      create_dataset = (name, dataset, metadata) => {
        this.setState(state=> produce(state, draft=>{
          draft.super_ds[name] = {
            data:dataset,
            meta: metadata,
            sub_collection_settings:{}
          }
        }))
      }
      add_data_to_super_ds = (name, dataset)=>{
        this.setState(state=> produce(state, draft=>{
          draft.super_ds[name].data = dataset
        }))
      }
      add_meta_data_to_super_ds = (name, metadata) =>{
        this.setState(state=> produce(state, draft=>{
          draft.super_ds[name].meta=metadata
        }))
      }
      add_sub_coll_setting_tp_super_ds = (name,coll_name,settings) =>{
        this.setState(state=> produce(state, draft=>{
          draft.super_ds[name].sub_collection_settings[coll_name]=settings
        }))

      }
      delete_dataset = async (name) =>{
        this.setState(state=> produce(state, draft=>{
          delete draft.super_ds[name]
        }))
          for(const KEY in this.state.super_ds){ // geting keys for rest of elements
            for(const key in this.state.super_ds[KEY].sub_collection_settings){ //geting keys for the parent dict that might hold what we want to delete
              if(this.state.super_ds[KEY].sub_collection_settings[key][name]){ // if a dict in the sub_collection_settings has it
                if(Object.values(this.state.super_ds[KEY].sub_collection_settings[key]).length>=1){
                  this.setState(state=> produce(state, draft=>{
                    delete draft.super_ds[KEY].sub_collection_settings[key]
                  }))
                }else{
                  this.setState(state=> produce(state, draft=>{
                    delete draft.super_ds[KEY].sub_collection_settings[key][name] // delete that obj
                  }))
  
                }
              }
            }
          }
      }
      remove_a_sub_coll_setting = (dataset, join_col) =>{
        if(this.state.super_ds[dataset].sub_collection_settings[join_col]!==undefined){
          this.setState(state=> produce(state, draft=>{
            delete draft.super_ds[dataset].sub_collection_settings[join_col] // delete that obj
          }))
        }
      }
      push_dataset_to_obj = (name,dataset)=>{
        this.setState(state=> produce(state, draft=>{
          draft.dataset_obj[name] = dataset
        }))
      }
      //            objct       string
      doSetState = (value,fb_state_val=null ) =>{
        // key is string valve can be anything
        console.log("value in doSetState--->",value)
        if(fb_state_val==="sub_coll_setitngs"){
          for(const item of Object.entries(value)){
            this.setState(state=> produce(state, draft=>{
              draft.sub_coll_setitngs[item[0]] = item[1]
            }))
          }
        }else if(fb_state_val==="dataset_info_obj"){
          for(const key in value){
            this.setState(state=> produce(state, draft=>{
              draft.dataset_info_obj[key] = value[key]
            }))
  
          }
        }else{
          for(const item of Object.entries(value)){
            this.setState(state=> produce(state, draft=>{
              draft[item[0]] = item[1]
            }))
          }
        }
      }
      doSetStateArray = (item) =>{
        this.setState(state=> produce(state, draft=>{
          draft.arr_settings.push(item)
        }))
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
      pushDataToFirestore = async(dataset_name) => {
        console.log("in pushDataToFirestore()")
        const dataset_info = this.state.super_ds[dataset_name]
        if(Object.keys(dataset_info.sub_collection_settings).length===0){
          const collection = this.secondaryDatabase.collection(dataset_name)
          let i = 1
          for(const obj of dataset_info.data){
            await collection.add(obj)
            console.log(i++)
          }
        }else{
          let i = 1
          console.log("more work ahead")
          for(const obj of dataset_info.data){
            const document = this.secondaryDatabase.collection(dataset_name).doc()
            for(const KEY in dataset_info.sub_collection_settings){
              for(const key in dataset_info.sub_collection_settings[KEY]){
                const sub_coll = this.secondaryDatabase.collection(`${dataset_name}/${document.id}/${key}`)
                for(const child_row of this.state.super_ds[key].data){
                  if(child_row[dataset_info.sub_collection_settings[KEY][key]]===obj[KEY]){
                    await sub_coll.add(child_row)
                    console.log("we got it!")
                  }
                }
              }  
            }
            await document.set(obj)
            console.log(i++)
          }
        }
        // let sec = firebase.initializeApp(this.state.second_config, "secondary");
        // console.log(sec.name);    // "otherProject name"
        // let secondaryDatabase = sec.firestore();
        // // make a collection for the data
        // const collection = secondaryDatabase.collection(collection_name)
        // let i = 1
        // for(const obj of arr_data){
        //   await collection.add(obj)
        //   console.log(i++)
        // }
      }
      
      pushDataWithSubCollectionToFirestore = async () =>{
        console.log("in pushDataWithSubCollectionToFirestore()")
        let sec = firebase.initializeApp(secondary_config, "testing_only");
        console.log(sec.name);    // "otherProject name"
        let secondaryDatabase = sec.firestore();
        for(const item of this.state.arr_settings){
          for(const p_data_row of this.state.dataset_obj[item.parent_collection_name]){
            const document = secondaryDatabase.collection(item.parent_collection_name).doc()
            for( const key in item.child_collections){
              console.log(item.parent_collection_name, key)
              const sub = secondaryDatabase.collection(`${item.parent_collection_name}/${document.id}/${key}`) // creating the sub colelction
              for(const c_data_row of this.state.dataset_obj[key]){
                if(c_data_row[item.child_collections[key]] === p_data_row[[item.parent_connection_column]]){
                  sub.add(c_data_row)
                  console.log("add")
                }
              }
            }
            document.set(p_data_row)
          }
        }
        this.setState({arr_settings:[]})
      }
      async componentDidMount(){
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.method = 'post'    

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
