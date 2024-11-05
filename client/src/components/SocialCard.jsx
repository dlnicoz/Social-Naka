import { Github, Globe, Instagram, Linkedin, Phone, Twitter, Youtube } from 'lucide-react';

const SocialCard = ({ user }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
      <div className="flex items-center">
        <img
          className="h-16 w-16 rounded-full object-cover"
          src={user.photoURL || 'https://via.placeholder.com/150'}
          alt={user.name}
        />
        <div className="ml-4">
          <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.profession}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {user.category}
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          {user.serviceType}
        </span>
      </div>

      <p className="mt-4 text-gray-600">{user.description}</p>

      <div className="mt-4 flex items-center text-sm text-gray-500">
        <svg
          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
        </svg>
        {user.location}
      </div>

      <div className="mt-4 flex flex-wrap gap-4">
        {user.contact?.phone && (
          <a
            href={`tel:${user.contact.phone}`}
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <Phone className="h-4 w-4 mr-1" />
            {user.contact.phone}
          </a>
        )}
        {user.contact?.whatsapp && (
          <a
            href={`https://wa.me/${user.contact.whatsapp}`}
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="h-4 w-4 mr-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {user.links?.website && (
          <a
            href={user.links.website}
            className="text-gray-400 hover:text-gray-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Globe className="h-5 w-5" />
          </a>
        )}
        {user.links?.github && (
          <a
            href={user.links.github}
            className="text-gray-400 hover:text-gray-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-5 w-5" />
          </a>
        )}
        {user.links?.linkedin && (
          <a
            href={user.links.linkedin}
            className="text-gray-400 hover:text-gray-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        )}
        {user.links?.twitter && (
          <a
            href={user.links.twitter}
            className="text-gray-400 hover:text-gray-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="h-5 w-5" />
          </a>
        )}
        {user.links?.instagram && (
          <a
            href={user.links.instagram}
            className="text-gray-400 hover:text-gray-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="h-5 w-5" />
          </a>
        )}
        {user.links?.youtube && (
          <a
            href={user.links.youtube}
            className="text-gray-400 hover:text-gray-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Youtube className="h-5 w-5" />
          </a>
        )}
      </div>
    </div>
  );
};

export default SocialCard;
