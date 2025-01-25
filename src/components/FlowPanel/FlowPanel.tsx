import { Text } from "@deriv-com/quill-ui";
import styles from "./FlowPanel.module.scss";

export const FlowPanel = () => {
    return (
        <div className={styles.container}>
            <Text size="lg" bold>
                Flow Panel
            </Text>
        </div>
    );
};
