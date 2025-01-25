import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { ParametersForm } from "./components";
import styles from "./BuilderPanel.module.scss";

export const BuilderPanel = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Builder Panel</h2>
            <PanelGroup direction="vertical" className={styles.panelGroup}>
                <Panel defaultSize={60} minSize={30} className={styles.panel}>
                    <ParametersForm />
                </Panel>
                <PanelResizeHandle className={styles.resizeHandle} />
                <Panel defaultSize={40} minSize={20} className={styles.panel}>
                    <div className={styles.bottomPanel} />
                </Panel>
            </PanelGroup>
        </div>
    );
};
