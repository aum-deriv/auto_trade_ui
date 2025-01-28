import { Text } from "@deriv-com/quill-ui";
import { ActiveStrategies } from "./components/ActiveStrategies";
import { StrategiesHistory } from "./components/StrategiesHistory";
import styles from "./StrategiesSection.module.scss";

export const StrategiesSection = () => {
    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <Text size="lg" bold>
                    Active Strategies
                </Text>
                <ActiveStrategies />
            </div>
            <div className={styles.section}>
                <Text size="lg" bold>
                    Strategy History
                </Text>
                <StrategiesHistory />
            </div>
        </div>
    );
};
