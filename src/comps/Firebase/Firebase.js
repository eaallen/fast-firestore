// import app from 'firebase/app';
import firebase from 'firebase/app'
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
          init_secoundary_firebase: this.init_secoundary_firebase,
        }
        this.state = {
          super_ds: {},
          sec_firestore: null,
        }
        firebase.initializeApp(config);
        console.log(firebase.app().name);  // "[DEFAULT]"
        this.auth = firebase.auth();
        this.db = firebase.firestore()

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
            sub_collection_settings:{},
            loading_info:{
              uploaded: false,
              loading: null
            }
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
        this.setState(state=> produce(state, draft=>{
          delete draft.super_ds[name]
        }))
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
      pushDataToFirestore = async(dataset_name) => {
        await this.setState(state=> produce(state, draft=>{
          draft.super_ds[dataset_name].loading_info.loading = true
        }))
        const single_ds = async() =>{
          console.log("func")
          const collection = this.state.sec_firestore.collection(dataset_name)
          // let i = 0
          for(const obj of dataset_info.data){
            await collection.add(obj)
            // this.setState(state=> produce(state, draft=>{
            //   draft.super_ds[dataset_name].loading_info.loading = i
            // }))
          }

        }
        const with_sub_ds = async() =>{
          // let i = 0
          console.log("more work ahead-------dataset_info.data.length",dataset_info.data.length)
          for(const obj of dataset_info.data){
            const document = this.state.sec_firestore.collection(dataset_name).doc()
            for(const KEY in dataset_info.sub_collection_settings){
              for(const key in dataset_info.sub_collection_settings[KEY]){ // key is the dataset name of what we are joining
                const sub_coll = this.state.sec_firestore.collection(`${dataset_name}/${document.id}/${key}`) // build the sub collection call it value of key
                const sub_ds = this.state.super_ds[key]
                if(sub_ds.meta.src==='data.world'){
                  for(let icount = 0; icount < sub_ds.meta.dataset_info.row_count + 100; icount += 100){
                    const data = await get_dw_data_for_sub_collection(sub_ds, icount) // currently this just grabs all the data then we run our own filter, it might e better to put the filter in the orignal query using the WHERE clause
                    console.log(",,,,,,,,,,,>>>>>>>><<<<<<<<<  d  a  t  a    >>>>>>>>>", data)
                    for(const child_row of data){
                      if(child_row[dataset_info.sub_collection_settings[KEY][key]]===obj[KEY]){
                        await sub_coll.add(child_row)
                        console.log("we DW got it!")
                      }
                    }

                  }
                }else{
                  for(const child_row of this.state.super_ds[key].data){ //<------ this maybe a problem
                    if(child_row[dataset_info.sub_collection_settings[KEY][key]]===obj[KEY]){
                      await sub_coll.add(child_row)
                      console.log("we got it!")
                    }
                  }
                }
              }  
            }
            await document.set(obj)
            // ++i
            // this.setState(state=> produce(state, draft=>{
            //   draft.super_ds[dataset_name].loading_info.loading = i // keeping this to set up loading bar latter
            // }))
          }
        }
        const get_dw_data_for_sub_collection = async(ds_info, num_row) =>{
          const resp = await axios({
            url: `https://api.data.world/v0/sql/${ds_info.meta.user}/${ds_info.meta.dw_data_set}`,
            data:{query: `SELECT * FROM ${ds_info.meta.name} Limit 100 OFFSET ${num_row}`},
            headers:{
                Authorization: "Bearer "+ds_info.meta.api_key
            },
          })
          return resp.data
        }
        const handle_dw = async(ds_info) =>{
          // get all of the data
          for(let icount = 0; icount < ds_info.meta.dataset_info.row_count + 100; icount += 100){

            const resp = await axios({
              url: `https://api.data.world/v0/sql/${ds_info.meta.user}/${ds_info.meta.dw_data_set}`,
              data:{query: `SELECT * FROM ${ds_info.meta.name} Limit 100 OFFSET ${icount}`},
              headers:{
                  Authorization: "Bearer "+ds_info.meta.api_key
              },
            })
            Object.defineProperty(ds_info, "data", {
              value: resp.data
            })
            console.log("the batched data--------->", ds_info.data)
            if(Object.values(ds_info.sub_collection_settings).length===0){
              single_ds()
            }else{with_sub_ds()}
          }
        }
        console.log("in pushDataToFirestore()")
        const dataset_info = {}
        Object.defineProperties(dataset_info,{
          data:{
            value: this.state.super_ds[dataset_name].data,
            writable: true
          },
          meta:{
            value: this.state.super_ds[dataset_name].meta,
            writable: false
          },
          sub_collection_settings:{
            value: this.state.super_ds[dataset_name].sub_collection_settings,
            writable: false
          }
        })
        console.log(dataset_info,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
        // let dataset_info = this.state.super_ds[dataset_name]
        if(dataset_info.meta.src==="data.world"){
          handle_dw(dataset_info)
          // get all of the data
          for(let icount = 0; icount < dataset_info.meta.dataset_info.row_count + 100; icount += 100){

            const resp = await axios({
              url: `https://api.data.world/v0/sql/${dataset_info.meta.user}/${dataset_info.meta.dw_data_set}`,
              data:{query: `SELECT * FROM ${dataset_info.meta.name} Limit 100 OFFSET ${icount}`},
              headers:{
                  Authorization: "Bearer "+dataset_info.meta.api_key
              },
            })
            Object.defineProperty(dataset_info, "data", {
              value: resp.data
            })
            console.log("the batched data--------->", dataset_info.data)
            if(Object.values(dataset_info.sub_collection_settings).length===0){
              single_ds()
            }else{with_sub_ds()}
          }
        }else{
          console.log("----DATA---->",dataset_info.data)
          if(Object.values(dataset_info.sub_collection_settings).length===0){
            single_ds()
          }else{
            with_sub_ds()
          }
  
        }
        await this.setState(state=> produce(state, draft=>{
          draft.super_ds[dataset_name].loading_info.loading = false
          draft.super_ds[dataset_name].loading_info.uploaded = true
        }))
        // firebase.app('second_configure').delete();
      }
      
      init_secoundary_firebase = async() =>{
        if(this.state.sec_firestore){
          await firebase.app('second_configure').delete();
        }
        let sec = firebase.initializeApp(this.state.second_config, "second_configure");
        let sec_db = sec.firestore(); 
        
        this.setState(state=> produce(state, draft=>{
          draft.sec_firestore = sec_db
        }))
      }

      pushDataWithSubCollectionToFirestore = async () =>{ // dont use this one
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
