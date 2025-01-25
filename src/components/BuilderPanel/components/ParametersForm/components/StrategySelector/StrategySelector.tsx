import { useAvailableStrategies } from "../../../../../../api/hooks/derived";
import { Strategy } from "../../../../../../api/hooks/derived/types";
import styles from "./StrategySelector.module.scss";

interface StrategySelectorProps {
    value: Strategy | null;
    onChange: (strategy: Strategy | null) => void;
}

export const StrategySelector = ({
    value,
    onChange,
}: StrategySelectorProps) => {
    const { data: strategies, isLoading, error } = useAvailableStrategies();

    if (error) {
        return (
            <div className={styles.container}>
                <div className={styles.error}>
                    Failed to load strategies: {error.message}
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <label className={styles.label}>Select Strategy</label>
            <select
                className={styles.select}
                value={value?.name ?? ""}
                onChange={(e) => {
                    const strategy = strategies?.find(
                        (s) => s.name === e.target.value
                    );
                    onChange(strategy ?? null);
                }}
                disabled={isLoading}
            >
                <option value="">
                    {isLoading ? "Loading strategies..." : "Select a strategy"}
                </option>
                {strategies?.map((strategy) => (
                    <option key={strategy.name} value={strategy.name}>
                        {strategy.name}
                    </option>
                ))}
            </select>
            {!isLoading && !strategies?.length && (
                <div className={styles.message}>No strategies available</div>
            )}
        </div>
    );
};
