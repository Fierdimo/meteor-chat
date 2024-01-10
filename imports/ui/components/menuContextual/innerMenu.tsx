import React from "react";
import "./menu_contextual.css"

export type MenuData = {
  label: string;
  action: (argument:any) => void;
};

type InnerMenuT = {
  menuData: MenuData[];
};

function elaborateMenu(item: MenuData, index: number) {
  return (
    <article key={index} className="inner-menu-item" onClick={()=>item.action(item.label)}>
      <div className="label">
        <p>{item.label}</p>
      </div>
    </article>
  );
}

export default function InnerMenu({ menuData }: InnerMenuT) {
  return <React.Fragment>{menuData.map(elaborateMenu)}</React.Fragment>;
}
