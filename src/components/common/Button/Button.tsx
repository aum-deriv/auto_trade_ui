import styles from "./Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
    isLoading?: boolean;
}

export const Button = ({
    variant = "primary",
    isLoading,
    children,
    disabled,
    className,
    ...props
}: ButtonProps) => {
    return (
        <button
            className={`${styles.button} ${styles[variant]} ${className || ""}`}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading ? "Loading..." : children}
        </button>
    );
};
