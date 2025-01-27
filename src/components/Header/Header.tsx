import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.title}>Auto Trade UI</div>
            <nav className={styles.nav}>
                <NavLink
                    to="/builder"
                    className={({ isActive }) =>
                        `${styles.link} ${isActive ? styles.active : ""}`
                    }
                >
                    Builder
                </NavLink>
                <NavLink
                    to="/monitor"
                    className={({ isActive }) =>
                        `${styles.link} ${isActive ? styles.active : ""}`
                    }
                >
                    Monitor
                </NavLink>
            </nav>
        </header>
    );
};
