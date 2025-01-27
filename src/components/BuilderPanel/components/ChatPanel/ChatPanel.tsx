import { TextInput } from "../../../common/TextInput";
import styles from "./ChatPanel.module.scss";

export const ChatPanel = () => {
    return (
        <div className={styles.container}>
            <div className={styles.messages}>{/* Messages will go here */}</div>
            <div className={styles.input}>
                <TextInput
                    placeholder="Type a message..."
                    className={styles.textInput}
                />
            </div>
        </div>
    );
};
