import { StrategyInstance } from "../../../../api/hooks/derived/types";
import { useStopStrategy } from "../../../../api/hooks/derived/strategies/useStopStrategy";
import { Button, Tag, Text } from "@deriv-com/quill-ui";
import styles from "./StrategyCard.module.scss";

interface StrategyCardProps {
    strategy: StrategyInstance;
}

export const StrategyCard = ({ strategy }: StrategyCardProps) => {
    const { mutate: stopStrategy, isLoading: isStoppingStrategy } =
        useStopStrategy();

    const handleStopStrategy = () => {
        stopStrategy({ id: strategy.id });
    };

    return (
        <div className={styles.strategy}>
            <div className={styles.header}>
                <Text size="lg" bold>
                    {strategy.name}
                </Text>
                <Tag
                    label={strategy.status}
                    variant="custom"
                    size="sm"
                    isBold
                    className={styles[strategy.status]}
                />
            </div>
            <div className={styles.details}>
                <Text size="sm">
                    Started: {new Date(strategy.start_time).toLocaleString()}
                </Text>
                {strategy.stop_time && (
                    <Text size="sm">
                        Stopped: {new Date(strategy.stop_time).toLocaleString()}
                    </Text>
                )}
                <div className={styles.parameters}>
                    <Text size="md" bold>
                        Parameters:
                    </Text>
                    {Object.entries(strategy.parameters).map(([key, value]) => (
                        <div key={key} className={styles.parameter}>
                            <Text size="sm">{key}:</Text>
                            <Text size="sm">{String(value)}</Text>
                        </div>
                    ))}
                </div>
                {strategy.status === "active" && (
                    <div className={styles.actions}>
                        <Button
                            color="black"
                            label="Stop"
                            size="sm"
                            type="button"
                            variant="secondary"
                            onClick={handleStopStrategy}
                            disabled={isStoppingStrategy}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
