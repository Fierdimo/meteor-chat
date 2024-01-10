import React from "react";
import "./menu_contextual.css";
import InnerMenu, { MenuData } from "./innerMenu";

type MenuT = {
  children: React.ReactElement;
  menu: MenuData[];
};
type AncholEl = {
  mouseX: number;
  mouseY: number;
};

export default function MenuContextual({ children, menu }: MenuT) {
  const [anchorEl, setAnchorEl] = React.useState<AncholEl | null>(null);

  React.useEffect(() => {
    document.addEventListener("click", () => setAnchorEl(null));
    return document.removeEventListener("click", () => setAnchorEl(null));
  }, []);

  React.useEffect(() => {
    const menu = document.getElementById("contextMenu");
    if (anchorEl) {
      menu?.style.setProperty("display", "block");
      menu?.style.setProperty("left", anchorEl.mouseX + "px");
      menu?.style.setProperty("top", anchorEl.mouseY + "px");
    } else {
      menu?.style.setProperty("display", "none");
    }
  }, [anchorEl]);

  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    setAnchorEl(
      anchorEl === null
        ? {
            mouseX: e.clientX + 2,
            mouseY: e.clientY - 6,
          }
        : null
    );
  }

  return (
    <React.Fragment>
      <div onContextMenu={handleClick}>{children}</div>
      <div id="contextMenu" className="context-menu">
        <InnerMenu menuData={menu} />
      </div>
    </React.Fragment>
  );
}
