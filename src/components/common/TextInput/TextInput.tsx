import styles from "./TextInput.module.scss";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    description?: string;
}

export const TextInput = ({
    label,
    error,
    description,
    className,
    ...props
}: TextInputProps) => {
    return (
        <div className={styles.container}>
            {label && (
                <label className={styles.label}>
                    {label}
                    {props.required && (
                        <span className={styles.required}>*</span>
                    )}
                </label>
            )}
            <input
                className={`${styles.input} ${error ? styles.error : ""} ${
                    className || ""
                }`}
                {...props}
            />
            {description && (
                <div className={styles.description}>{description}</div>
            )}
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    );
};
