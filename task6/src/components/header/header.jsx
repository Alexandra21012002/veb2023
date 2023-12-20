import React from "react";
import "./header.css";

export function Header() {
  return (
    <header>
      <div className="title">
        <p className="title-text">Админка фильмотеки</p>
      </div>
      <div className="block-author">
        <p className="author">Сергеева Александра 6409</p>
      </div>
    </header>
  );
}
