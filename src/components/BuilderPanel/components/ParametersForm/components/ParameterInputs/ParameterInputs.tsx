import { Strategy } from "../../../../../../api/hooks/derived/types";
import { TextField } from "@deriv-com/quill-ui";
import { Checkbox } from "../../../../../common/Checkbox";
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
                                <TextField
                                    label={param.name}
                                    value={(value as string) ?? ""}
                                    onChange={(e) =>
                                        onChange(param.name, e.target.value)
                                    }
                                    message={param.description}
                                    shouldRound
                                    variant="outline"
                                    required={param.required}
                                    type="text"
                                />
                            </div>
                        );

                    case "number":
                        return (
                            <div key={param.name} className={styles.field}>
                                <TextField
                                    label={param.name}
                                    value={(value as number) ?? ""}
                                    onChange={(e) =>
                                        onChange(
                                            param.name,
                                            Number(e.target.value)
                                        )
                                    }
                                    message={param.description}
                                    shouldRound
                                    variant="outline"
                                    required={param.required}
                                    type="number"
                                />
                            </div>
                        );

                    case "boolean":
                        return (
                            <div key={param.name} className={styles.field}>
                                <Checkbox
                                    label={param.name}
                                    checked={(value as boolean) ?? false}
                                    onChange={(e) =>
                                        onChange(param.name, e.target.checked)
                                    }
                                    description={param.description}
                                />
                            </div>
                        );

                    default:
                        return null;
                }
            })}
        </div>
    );
};
