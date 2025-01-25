import { useState } from "react";
import { Strategy } from "../../../../api/hooks/derived/types";
import { ParameterInputs, StrategySelector } from "./components";
import styles from "./ParametersForm.module.scss";

export const ParametersForm = () => {
    const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(
        null
    );
    const [parameters, setParameters] = useState<Record<string, unknown>>({});

    const handleParameterChange = (name: string, value: unknown) => {
        setParameters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className={styles.container}>
            <StrategySelector
                value={selectedStrategy}
                onChange={(strategy) => {
                    setSelectedStrategy(strategy);
                    setParameters({}); // Reset parameters when strategy changes
                }}
            />
            <ParameterInputs
                strategy={selectedStrategy}
                values={parameters}
                onChange={handleParameterChange}
            />
        </div>
    );
};
