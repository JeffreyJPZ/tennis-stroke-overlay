import './ViewerToolbar.css';

// Toolbar with button to begin rendering and choose which layer(s) to show
export default function ViewerToolbar() {
    return (
        <div id="viewerToolbar">
            <button>Overlay</button>
            <button>Show Comparison</button>
            <button>Show Reference</button>
            <button>Show Both</button>
            <button>Show 3D Model</button>
        </div>
    )
}