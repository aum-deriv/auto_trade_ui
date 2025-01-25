import { Text } from "@deriv-com/quill-ui";
import styles from "./Header.module.scss";

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Text size="xl" bold>
                    Auto Trade UI
                </Text>
            </div>
        </header>
    );
};
