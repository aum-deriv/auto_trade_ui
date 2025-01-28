import { useState } from "react";
import { useStartStrategy } from "../../../../api/hooks/derived/strategies";
import { ParameterInputs, StrategySelector } from "./components";
import { Button, Text, useSnackbar } from "@deriv-com/quill-ui";
import { useStrategy } from "../../../../contexts/StrategyContext";
import styles from "./ParametersForm.module.scss";
import { useNavigate } from "react-router-dom";

export const ParametersForm = () => {
    const { selectedStrategy, setSelectedStrategy } = useStrategy();
    const [parameters, setParameters] = useState<Record<string, unknown>>({});
    const { mutate: startStrategy, isLoading, error } = useStartStrategy();
    const { addSnackbar } = useSnackbar();
    const navigate = useNavigate();

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
        })
            .then(() =>
                addSnackbar({
                    hasCloseButton: false,
                    actionText: "Go to Dashboard ⇱",
                    onActionClick: () => navigate("/dashboard"),
                    message: `Strategy ${selectedStrategy.name} has started.`,
                })
            )
            .catch(() =>
                addSnackbar({
                    hasCloseButton: false,
                    message: `Unable to start strategy: ${error?.message}`,
                })
            );
    };

    return (
        <div className={styles.container}>
            <Text size="md" bold>
                Trade Parameters
            </Text>
            <StrategySelector
                value={selectedStrategy}
                onChange={(strategy) => {
                    console.log("Selected strategy:", strategy); // Debug log
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
