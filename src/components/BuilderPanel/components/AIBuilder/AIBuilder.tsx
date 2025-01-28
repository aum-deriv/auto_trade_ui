import { Text, TextField } from "@deriv-com/quill-ui";
import styles from "./AIBuilder.module.scss";

export const AIBuilder = () => {
    return (
        <div className={styles.container}>
            <Text size="md" bold>
                AI Builder
            </Text>

            <div className={styles.messages}>
                <Text className={styles.tempMessage} size="xl">
                    WIP 🚧
                </Text>
            </div>
            <div className={styles.input}>
                <TextField
                    disabled
                    placeholder="Type a message..."
                    inputSize="lg"
                    variant="outline"
                />
            </div>
        </div>
    );
};
