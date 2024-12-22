import { useState } from "react";

interface CardProps {
  cardName: string;
  imageUrl: string;
  width: string;
  height: string;
}

const Main = ({ cardName, imageUrl, width, height }: CardProps) => {
  return (
    <>
      <div>
        <h1>Главная страница</h1>
        <div>
          <h2>{cardName}</h2>
          <img src={imageUrl} alt={cardName} style={{ width, height }} />
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  return {
    props: {
      cardName: "Владик",
      imageUrl:
        "https://sun9-41.userapi.com/impg/ufw7hOTzKEZoT2G8XSrM_NZZtVbegDYE39qz3Q/3_7gvL1fBb4.jpg?size=300x300&quality=95&sign=ae6dad5a8a06d8175502a1e4ead8733a&type=audio",
      width: "100px",
      height: "100px",
    },
  };
}

export default Main;
