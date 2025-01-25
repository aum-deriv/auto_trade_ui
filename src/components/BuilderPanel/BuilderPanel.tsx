import { Text } from "@deriv-com/quill-ui";
import styles from "./BuilderPanel.module.scss";

export const BuilderPanel = () => {
    return (
        <div className={styles.container}>
            <Text size="lg" bold>
                Builder Panel
            </Text>
        </div>
    );
};
