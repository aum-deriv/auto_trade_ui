import { useState } from "react";
import { Strategy } from "../../../../api/hooks/derived/types";
import { useStartStrategy } from "../../../../api/hooks/derived/strategies";
import { ParameterInputs, StrategySelector } from "./components";
import { Button, Text } from "@deriv-com/quill-ui";
import styles from "./ParametersForm.module.scss";

export const ParametersForm = () => {
    const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(
        null
    );
    const [parameters, setParameters] = useState<Record<string, unknown>>({});
    const { mutate: startStrategy, isLoading } = useStartStrategy();

    const handleParameterChange = (name: string, value: unknown) => {
        setParameters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const isValid =
        selectedStrategy &&
        selectedStrategy.parameters.every(
            (param) => !param.required || parameters[param.name] !== undefined
        );

    const handleStart = () => {
        if (!selectedStrategy || !isValid) return;

        startStrategy({
            name: selectedStrategy.name,
            parameters,
        });
    };

    return (
        <div className={styles.container}>
            <Text size="md" bold>
                Trade Parameters
            </Text>
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
            {selectedStrategy && (
                <div className={styles.actions}>
                    <Button
                        onClick={handleStart}
                        disabled={!isValid}
                        isLoading={isLoading}
                        size="lg"
                        variant="primary"
                        label="Start Strategy"
                        fullWidth
                    />
                </div>
            )}
        </div>
    );
};
