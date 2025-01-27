import { useEffect } from "react";
import { useAvailableStrategies } from "../../../../../../api/hooks/derived";
import { Strategy } from "../../../../../../api/hooks/derived/types";
import { DropdownButton, type TSingleSelectItem } from "@deriv-com/quill-ui";
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

    useEffect(() => {
        if (strategies?.length && !value) {
            const defaultStrategy = strategies[0];
            onChange(defaultStrategy);
        }
    }, [strategies, value, onChange]);

    if (error) {
        return (
            <div className={styles.container}>
                <div className={styles.error}>
                    Failed to load strategies: {error.message}
                </div>
            </div>
        );
    }

    const options: TSingleSelectItem[] =
        strategies?.map((strategy) => ({
            id: strategy.name,
            label: strategy.name,
            onClick: () => {
                onChange(strategy);
            },
        })) ?? [];

    return (
        <div className={styles.container}>
            <DropdownButton
                color="black"
                contentHeight="sm"
                contentTitle="Select Strategy"
                iconPosition="start"
                label={value?.name ?? "Select Strategy"}
                onClose={() => {}}
                onOpen={() => {}}
                onSelectionChange={(selectedOptions) => {
                    if (selectedOptions.length > 0) {
                        const selectedOption = selectedOptions[0];
                        const strategy = strategies?.find(
                            (s) => s.name === selectedOption.id
                        );
                        if (strategy) {
                            onChange(strategy);
                        }
                    }
                }}
                options={options}
                size="md"
                variant="primary"
                disabled={isLoading}
                closeContentOnClick
                fullWidth
            />
            {!isLoading && !strategies?.length && (
                <div className={styles.message}>No strategies available</div>
            )}
        </div>
    );
};
