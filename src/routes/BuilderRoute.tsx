import styles from "./BuilderRoute.module.scss";
import { BuilderPanel } from "../components/BuilderPanel";
import { FlowPanel } from "../components/FlowPanel";
import { StrategyProvider } from "../contexts/StrategyContext";

export const BuilderRoute = () => {
    return (
        <StrategyProvider>
            <div className={styles.container}>
                <div className={styles.builderPanel}>
                    <BuilderPanel />
                </div>
                <div className={styles.flowPanel}>
                    <FlowPanel />
                </div>
            </div>
        </StrategyProvider>
    );
};
