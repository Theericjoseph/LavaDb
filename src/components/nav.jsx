import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../context/LoginProvider';

export default function Nav() {
    const { isLoggedIn, setIsLoggedIn } = useLogin();

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        localStorage.removeItem("Expires_In");
    }

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/" >Home</Link>
                </li>
                <li>
                    <Link to="/volcano_list" >Volcano List</Link>
                </li>

                {
                    isLoggedIn ?
                        <li>
                            <Link onClick={logout}>Logout</Link>
                        </li> :
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                }

            </ul>
        </nav>
    )
}