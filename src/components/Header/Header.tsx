import styles from "./Header.module.scss";

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <h1 className={styles.title}>Auto Trade UI</h1>
            </div>
        </header>
    );
};
