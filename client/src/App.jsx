import './App.css'
import React from 'react'
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar/index.jsx";
import View from "./components/View/index.jsx";
import BreadCrumb from "./components/BreadCrumb/index.jsx";

function App() {
    return (
        <React.Fragment>
            <SideBar/>
            <TopBar/>
            <View>
                <BreadCrumb menu="Interface"/>
            </View>
        </React.Fragment>
    )
}

export default App
