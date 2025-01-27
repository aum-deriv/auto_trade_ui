import { Text, TextField } from "@deriv-com/quill-ui";
import styles from "./ChatPanel.module.scss";

export const ChatPanel = () => {
    return (
        <div className={styles.container}>
            <Text size="md" bold>
                AI Builder
            </Text>
            <Text size="xl">WIP 🚧</Text>
            <div className={styles.messages}>{/* Messages will go here */}</div>
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
