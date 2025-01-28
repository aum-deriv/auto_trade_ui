import { NavLink } from "react-router-dom";
import { BrandDerivLogoCoralIcon } from "@deriv/quill-icons/Logo";
import { LegacyTraderSHubIcon } from "@deriv/quill-icons/Legacy";
import { Text } from "@deriv-com/quill-ui";
import styles from "./Header.module.scss";
import { LabelPairedPuzzleCaptionBoldIcon } from "@deriv/quill-icons/LabelPaired";

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
                    to="/dashboard"
                    className={({ isActive }) =>
                        `${styles.link} ${isActive ? styles.active : ""}`
                    }
                >
                    {({ isActive }) => (
                        <>
                            <LegacyTraderSHubIcon
                                fill="#000000"
                                iconSize="xs"
                            />
                            <Text size="md" bold={isActive}>
                                Dashboard
                            </Text>
                        </>
                    )}
                </NavLink>
                <NavLink
                    to="/builder"
                    className={({ isActive }) =>
                        `${styles.link} ${isActive ? styles.active : ""}`
                    }
                >
                    {({ isActive }) => (
                        <>
                            <LabelPairedPuzzleCaptionBoldIcon
                                width="22"
                                height="22"
                            />

                            <Text size="md" bold={isActive}>
                                Builder
                            </Text>
                        </>
                    )}
                </NavLink>
            </nav>
        </header>
    );
};
