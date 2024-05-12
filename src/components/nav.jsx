import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
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
                    <NavLink to="/" >Home</NavLink>
                </li>
                <li>
                    <NavLink to="/volcano_list" >Volcano List</NavLink>
                </li>

                {
                    isLoggedIn ?
                        <li>
                            <Link onClick={logout}>Logout</Link>
                        </li> :
                        <li>
                            <NavLink to="/login">Login</NavLink>
                        </li>
                }

            </ul>
        </nav>
    )
}