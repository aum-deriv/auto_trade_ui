import styles from "./BuilderRoute.module.scss";
import { BuilderPanel } from "../components/BuilderPanel";
import { FlowPanel } from "../components/FlowPanel";

export const BuilderRoute = () => {
    return (
        <div className={styles.container}>
            <div className={styles.builderPanel}>
                <BuilderPanel />
            </div>
            <div className={styles.flowPanel}>
                <FlowPanel />
            </div>
        </div>
    );
};
