import { Panel, PanelGroup } from "react-resizable-panels";
import { BuilderPanel } from "../BuilderPanel";
import { FlowPanel } from "../FlowPanel";
import { TradesSection } from "../TradesSection";
import { StrategiesSection } from "../StrategiesSection";
import { ResizeHandle } from "../ResizeHandle";
import styles from "./AppContent.module.scss";

export const AppContent = () => {
    return (
        <div className={styles.container}>
            <PanelGroup direction="vertical" className={styles.panelGroup}>
                <Panel defaultSize={70} minSize={40} className={styles.panel}>
                    <PanelGroup
                        direction="horizontal"
                        className={styles.panelGroup}
                    >
                        <Panel defaultSize={50} className={styles.panel}>
                            <BuilderPanel />
                        </Panel>
                        <ResizeHandle direction="horizontal" />
                        <Panel defaultSize={50} className={styles.panel}>
                            <FlowPanel />
                        </Panel>
                    </PanelGroup>
                </Panel>
                <ResizeHandle direction="vertical" />
                <Panel defaultSize={30} minSize={20} className={styles.panel}>
                    <PanelGroup
                        direction="horizontal"
                        className={styles.panelGroup}
                    >
                        <Panel defaultSize={50} className={styles.panel}>
                            <TradesSection />
                        </Panel>
                        <ResizeHandle direction="horizontal" />
                        <Panel defaultSize={50} className={styles.panel}>
                            <StrategiesSection />
                        </Panel>
                    </PanelGroup>
                </Panel>
            </PanelGroup>
        </div>
    );
};
