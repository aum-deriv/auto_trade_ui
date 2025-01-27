import { Strategy } from "../../../../../../api/hooks/derived/types";
import { TextInput } from "../../../../../common/TextInput";
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
                            <TextInput
                                key={param.name}
                                label={param.name}
                                value={(value as string) ?? ""}
                                onChange={(e) =>
                                    onChange(param.name, e.target.value)
                                }
                                required={param.required}
                                description={param.description}
                            />
                        );

                    case "number":
                        return (
                            <TextInput
                                key={param.name}
                                type="number"
                                label={param.name}
                                value={(value as number) ?? ""}
                                onChange={(e) =>
                                    onChange(param.name, Number(e.target.value))
                                }
                                required={param.required}
                                description={param.description}
                            />
                        );

                    case "boolean":
                        return (
                            <Checkbox
                                key={param.name}
                                label={param.name}
                                checked={(value as boolean) ?? false}
                                onChange={(e) =>
                                    onChange(param.name, e.target.checked)
                                }
                                description={param.description}
                            />
                        );

                    default:
                        return null;
                }
            })}
        </div>
    );
};
