const SocialCard = ({ card }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <img src={card.profilePhoto} alt={card.profession} className="w-full h-32 object-cover rounded" />
        <h2 className="text-lg font-bold mt-2">{card.profession}</h2>
        <p>{card.description}</p>
        <div className="mt-2">
          {card.socialLinks.map(link => (
            <a key={link._id} href={link.url} className="block text-blue-500">{link.platform}</a>
          ))}
        </div>
      </div>
    );
  };
  
  export default SocialCard;
  