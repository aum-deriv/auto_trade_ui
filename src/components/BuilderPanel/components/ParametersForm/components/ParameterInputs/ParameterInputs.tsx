import { Strategy } from "../../../../../../api/hooks/derived/types";
import styles from "./ParameterInputs.module.scss";

interface ParameterInputsProps {
    strategy: Strategy | null;
    values: Record<string, unknown>;
    onChange: (name: string, value: unknown) => void;
}

export const ParameterInputs = ({
    strategy,
    values,
    onChange,
}: ParameterInputsProps) => {
    if (!strategy) return null;

    return (
        <div className={styles.container}>
            {strategy.parameters.map((param) => {
                const value = values[param.name];

                switch (param.type) {
                    case "string":
                        return (
                            <div key={param.name} className={styles.field}>
                                <label className={styles.label}>
                                    {param.name}
                                    {param.required && (
                                        <span className={styles.required}>
                                            *
                                        </span>
                                    )}
                                </label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    value={(value as string) ?? ""}
                                    onChange={(e) =>
                                        onChange(param.name, e.target.value)
                                    }
                                    required={param.required}
                                />
                                <span className={styles.description}>
                                    {param.description}
                                </span>
                            </div>
                        );

                    case "number":
                        return (
                            <div key={param.name} className={styles.field}>
                                <label className={styles.label}>
                                    {param.name}
                                    {param.required && (
                                        <span className={styles.required}>
                                            *
                                        </span>
                                    )}
                                </label>
                                <input
                                    type="number"
                                    className={styles.input}
                                    value={(value as number) ?? ""}
                                    onChange={(e) =>
                                        onChange(
                                            param.name,
                                            Number(e.target.value)
                                        )
                                    }
                                    required={param.required}
                                />
                                <span className={styles.description}>
                                    {param.description}
                                </span>
                            </div>
                        );

                    case "boolean":
                        return (
                            <div key={param.name} className={styles.field}>
                                <label className={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        className={styles.checkbox}
                                        checked={(value as boolean) ?? false}
                                        onChange={(e) =>
                                            onChange(
                                                param.name,
                                                e.target.checked
                                            )
                                        }
                                    />
                                    {param.name}
                                </label>
                                <span className={styles.description}>
                                    {param.description}
                                </span>
                            </div>
                        );

                    default:
                        return null;
                }
            })}
        </div>
    );
};
