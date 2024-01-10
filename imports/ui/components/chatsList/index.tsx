import React from "react";

import "./chatList.css";
import "./avatar.css";
import MenuContextual from "../menuContextual";

type contactData = {
  _id: number;
  image: number;
  name: string;
  online: boolean;
  lastSeen: Date;
  subtitle: string;
};

export default function ChatList() {
  const exampleData: contactData[] = [
    {
      _id: 1,
      image: 1,
      name: "personaje de fondo A",
      online: true,
      lastSeen: new Date(),
      subtitle: "friend",
    },
  ];

  const [shadowColor, setShadowColor] = React.useState("#0ac");
  React.useEffect(() => {
    document.documentElement.style.setProperty("--color0", shadowColor);
  }, [shadowColor]);

  function toggleColor() {
    setShadowColor(shadowColor === "#0ac" ? "#01f" : "#0ac");
  }

  const menu = [
    {
      label: "Abrir conversacion",
      action: (label) => console.log(label),
    },
    {
      label: "Archivar conversación",
      action: (label) => console.log(label),
    },
    {
      label: "Invitar a alguien",
      action: (label) => console.log(label),
    },
  ];

  return (
    <div className="list-wrapper">
      <ul className="list">
        {[1, 2, 3].map((data) => {
          return (
            <MenuContextual key={data} menu={menu}>
              <li className="list-item">
                <div className="com">
                  <a className="th">
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/488320/profile/profile-80.jpg" />
                  </a>
                </div>
                <div className="list-item-content">
                  <h4>Hitesh Kumar</h4>
                  <p>@hk-skit</p>
                </div>
                <div className="list-item-signals">
                  <button onClick={() => toggleColor()}>color</button>
                </div>
              </li>
            </MenuContextual>
          );
        })}
      </ul>
    </div>
  );
}
