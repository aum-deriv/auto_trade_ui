import { PanelResizeHandle } from "react-resizable-panels";
import styles from "./ResizeHandle.module.scss";

interface ResizeHandleProps {
    direction?: "horizontal" | "vertical";
}

export const ResizeHandle = ({
    direction = "horizontal",
}: ResizeHandleProps) => {
    return (
        <PanelResizeHandle className={styles.resizeHandle}>
            <div
                className={`${styles.iconWrapper} ${
                    direction === "vertical" ? styles.vertical : ""
                }`}
            ></div>
        </PanelResizeHandle>
    );
};
