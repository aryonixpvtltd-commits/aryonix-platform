import { avatars } from "../assets/people.js";

function AvatarStack() {
  return (
    <div className="avatar-strip" aria-label="People collaborating with Quo">
      {avatars.map((person) => (
        <figure className="avatar-strip__item" key={person.name}>
          <img src={person.src} alt={`${person.name}, ${person.role}`} loading="lazy" />
          <figcaption>
            <strong>{person.name.split(" ")[0]}</strong>
            <span>{person.role}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default AvatarStack;
