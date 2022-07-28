import { Component, OnInit } from '@angular/core';
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import { initializeApp } from "firebase/app";
   
const firebaseConfig = {
      apiKey: "AIzaSyA2J924i7TsFzWITgJeBj0G65u5RSIf6tU",
      authDomain: "tpintegrador-669e5.firebaseapp.com",
      projectId: "tpintegrador-669e5",
      storageBucket: "tpintegrador-669e5.appspot.com",
      messagingSenderId: "192196730643",
      appId: "1:192196730643:web:d53f94416b8e365411c4e6"
};
    
    // Initialize Firebase
const app = initializeApp(firebaseConfig);
    // Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

var URLfoto: string = '';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {

  URLfoto: string = '';
  
  constructor() { }

  ngOnInit(): void {
    getDownloadURL(ref(storage, 'images/foto.png')).then((url) => {
      this.URLfoto=url;
    });
  }

}


