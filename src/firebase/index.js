import firebase from 'firebase'
import 'firebase/firestore'
const config = {
	apiKey: 'AIzaSyA3RIjZJIcDoH7aE-Vgw9sstYIStCrW8Hg',
	authDomain: 'simplest-crud-83e99.firebaseapp.com',
	databaseURL: 'https://simplest-crud-83e99.firebaseio.com',
	projectId: 'simplest-crud-83e99',
	storageBucket: 'simplest-crud-83e99.appspot.com',
	messagingSenderId: '841196885938',
    appId: '1:841196885938:web:8ee7243f70a57c4ed636ab'
}
const firebaseapp = firebase.initializeApp(config)
export default firebaseapp.firestore()