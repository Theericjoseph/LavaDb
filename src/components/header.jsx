import Nav from "./nav";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolcano } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
    return (
        <header>
            <div className="Logo">
            {/* Icon */}
            <FontAwesomeIcon icon={faVolcano} size="2xl" className="icon" />
            <h2 className="title">LavaDB</h2>
            </div>

            <Nav />
        </header>
    )
}