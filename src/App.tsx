import './App.css'
import NavigationMenu from "./components/NavigationMenu.tsx";
import FileUpload from "./components/FileUpload.tsx";
import Viewer from "./components/Viewer.tsx";
import ViewerToolbar from "./components/ViewerToolbar.tsx";

export default function App() {

  return (
    <div id="app">
        <NavigationMenu />
        <div id="content">
            <FileUpload name={"comparison"}/>
            <FileUpload name={"reference"}/>
            <Viewer />
            <ViewerToolbar />
        </div>
    </div>
  )
}
