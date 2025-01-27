import { Panel, PanelGroup } from "react-resizable-panels";
import { Text } from "@deriv-com/quill-ui";
import { ParametersForm } from "./components";
import { ChatPanel } from "./components/ChatPanel";
import { ResizeHandle } from "../ResizeHandle";
import styles from "./BuilderPanel.module.scss";

export const BuilderPanel = () => {
    return (
        <div className={styles.container}>
            <Text size="lg" bold>
                Strategy Builder
            </Text>
            <PanelGroup direction="vertical" className={styles.panelGroup}>
                <Panel defaultSize={60} minSize={30} className={styles.panel}>
                    <ParametersForm />
                </Panel>
                <ResizeHandle direction="vertical" />
                <Panel defaultSize={40} minSize={20} className={styles.panel}>
                    <ChatPanel />
                </Panel>
            </PanelGroup>
        </div>
    );
};
