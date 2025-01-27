import { StrategyInstance } from "../../../../api/hooks/derived/types";
import { useStopStrategy } from "../../../../api/hooks/derived/strategies/useStopStrategy";
import { Button } from "../../../common/Button";
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
                <div className={styles.name}>{strategy.name}</div>
                <div className={`${styles.status} ${styles[strategy.status]}`}>
                    {strategy.status}
                </div>
            </div>
            <div className={styles.details}>
                <div className={styles.time}>
                    Started: {new Date(strategy.start_time).toLocaleString()}
                </div>
                {strategy.stop_time && (
                    <div className={styles.time}>
                        Stopped: {new Date(strategy.stop_time).toLocaleString()}
                    </div>
                )}
                <div className={styles.parameters}>
                    <div className={styles.parametersTitle}>Parameters:</div>
                    {Object.entries(strategy.parameters).map(([key, value]) => (
                        <div key={key} className={styles.parameter}>
                            <span className={styles.parameterName}>{key}:</span>{" "}
                            <span className={styles.parameterValue}>
                                {String(value)}
                            </span>
                        </div>
                    ))}
                </div>
                {strategy.status === "active" && (
                    <div className={styles.actions}>
                        <Button
                            variant="secondary"
                            onClick={handleStopStrategy}
                            isLoading={isStoppingStrategy}
                            className={styles.stopButton}
                        >
                            Stop Strategy
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
