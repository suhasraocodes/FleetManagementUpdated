// src/components/ContentCard.js
import React from 'react';

const contentData = [
  {
    title: "We manage",
    description: "We transport 1% of the world's containers and 2% of commodities. We do not just manage ships. We realise dreams.",
    image: "https://images.ctfassets.net/grb5fvwhwnyo/A0gAWLyMPTck3dfGvCcT9/41212db1447902b5e5ebadd6db4077d9/card-sustainable-logistics-101.jpg",
    link: "#"
  },
  {
    title: "We supervise",
    description: "We believe in doing it right, every step of the way. From design to construction to the actual delivery of the vessel, we provide a one-stop, end-to-end service that caters to all your requirements.",
    image: "https://static.vecteezy.com/system/resources/previews/027/868/408/non_2x/a-big-truck-is-driving-along-the-highway-delivering-goods-the-concept-of-logistics-and-delivery-routes-by-road-ai-generated-free-photo.jpg",
    link: "#"
  },
  {
    title: "Sustainable Logistics",
    description: "Our commitment to sustainability ensures that we minimize environmental impact while maximizing efficiency. We employ the latest technologies and practices in sustainable logistics.",
    image: "https://png.pngtree.com/thumb_back/fh260/background/20230524/pngtree-raleigh-port-trucks-for-moving-cargoes-at-night-image_2611127.jpg",
    link: "#"
  }
];

const ContentCard = () => {
  return (
    <div className="container mx-auto p-4">
      {contentData.map((content, index) => (
        <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} mb-8`} key={index}>
          <img 
            src={content.image} 
            alt={content.title} 
            style={{ width: '100%', maxWidth: '650px', height: '400px', objectFit: 'cover' }} 
          />
          <div className="flex flex-col justify-center p-4 md:p-8 bg-white">
            <h2 className="text-xl font-bold mb-2">{content.title}</h2>
            <p className="mb-4">{content.description}</p>
            <a href={content.link} className="text-blue-500 hover:underline">Discover more</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentCard;
