import styles from "./Checkbox.module.scss";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    description?: string;
}

export const Checkbox = ({
    label,
    description,
    className,
    ...props
}: CheckboxProps) => {
    return (
        <div className={styles.container}>
            <label className={styles.label}>
                <input
                    type="checkbox"
                    className={`${styles.checkbox} ${className || ""}`}
                    {...props}
                />
                {label}
            </label>
            {description && (
                <div className={styles.description}>{description}</div>
            )}
        </div>
    );
};
