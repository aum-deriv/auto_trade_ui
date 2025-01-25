import { Panel, PanelGroup } from "react-resizable-panels";
import { BuilderPanel } from "../BuilderPanel";
import { FlowPanel } from "../FlowPanel";
import { ResizeHandle } from "../ResizeHandle";
import styles from "./AppContent.module.scss";

export const AppContent = () => {
    return (
        <div className={styles.container}>
            <PanelGroup direction="horizontal" className={styles.panelGroup}>
                <Panel defaultSize={50} className={styles.panel}>
                    <BuilderPanel />
                </Panel>
                <ResizeHandle direction="horizontal" />
                <Panel defaultSize={50} className={styles.panel}>
                    <FlowPanel />
                </Panel>
            </PanelGroup>
        </div>
    );
};
