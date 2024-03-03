import './NavigationMenu.css';

// Toolbar with title, about section, and overlay section
export default function NavigationMenu() {
    return (
        <div id="navigationMenu">
            <a id="title">Pose Overlay</a>
            <a className="navigationElement">Overlay</a>
            <a className="navigationElement">About</a>
        </div>
    )
}