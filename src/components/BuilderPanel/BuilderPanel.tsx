import { ParametersForm } from "./components";
import styles from "./BuilderPanel.module.scss";

export const BuilderPanel = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Builder Panel</h2>
            <ParametersForm />
        </div>
    );
};
