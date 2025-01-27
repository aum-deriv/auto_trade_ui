import { NavLink } from "react-router-dom";
import { Text } from "@deriv-com/quill-ui";
import styles from "./Header.module.scss";
import { BrandDerivLogoCoralIcon } from "@deriv/quill-icons/Logo";

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.brand}>
                <BrandDerivLogoCoralIcon height="20px" width="20px" />
                <Text size="md" bold>
                    AutoTrade
                </Text>
            </div>
            <nav className={styles.nav}>
                <NavLink
                    to="/builder"
                    className={({ isActive }) =>
                        `${styles.link} ${isActive ? styles.active : ""}`
                    }
                >
                    {({ isActive }) => (
                        <Text size="md" bold={isActive}>
                            Builder
                        </Text>
                    )}
                </NavLink>
                <NavLink
                    to="/monitor"
                    className={({ isActive }) =>
                        `${styles.link} ${isActive ? styles.active : ""}`
                    }
                >
                    {({ isActive }) => (
                        <Text size="md" bold={isActive}>
                            Monitor
                        </Text>
                    )}
                </NavLink>
            </nav>
        </header>
    );
};
