import { IconStar, IconMessage, IconCircleCheck, IconHeart, IconBellPlus } from "@tabler/icons-react";
import styles from './profile.module.css';

import alexYu from "../../../../assets/images/profile-photos/alexYu.jpg";
import fernando from "../../../../assets/images/profile-photos/fernandoOlivarNeri.jpeg";
import cook from "../../../../assets/images/profile-examples/Dalgona Cookies.jpg";
import games from "../../../../assets/images/profile-examples/games.jpeg";
import squid from "../../../../assets/images/profile-examples/squid.jpeg";

import { BellPlusIcon, User, User2 } from "lucide-react";

const ProfilePage = () => {
  const user = {
    name: "Player456",
    avatar: alexYu,
    bio: "I'VE PLAYED THESE GAMES BEFORE\nAll sales final ^-^",
    posts: 17,
    followers: 455,
    following: 1,
    rating: 5,
    compliments: {
      itemAsDescribed: 7,
      onTime: 7,
      communicative: 6,
    },
    listings: [
      { id: 1, name: "Squid", price: "$10", image: squid },
      { id: 2, name: "Games", price: "$30", image: games },
      { id: 3, name: "Dalgona Cookies", price: "$7", image: cook },
    ],
  };

  return (
    <div className={`${styles.container}`}>
      {/* Profile Section */}
      <div className={styles.profileCard}>
  <div className={styles.profileDetails}>
    <img src={user.avatar} alt="avatar" className={styles.avatar} />
    
    <div className={styles.info}>
      <h2>
        {user.name} <BellPlusIcon size={20} color="#6c63ff" />
      </h2>
      <p className={styles.bio}>{user.bio}</p>
      <div className={styles.stats}>
        <span>{user.posts} Posts</span>
        <span>{user.followers} Followers</span>
        <span>{user.following} Following</span>
      </div>
      <div className={styles.rating}>
        {[...Array(user.rating)].map((_, i) => (
          <IconStar key={i} size={20} color="#fbbf24" />
        ))}
      </div>
    </div>
    
    <div className={styles.actions}>
      <button className={styles.followButton}>Follow</button>
      <button className={styles.messageButton}>
        <IconMessage size={16} /> Message
      </button>
    </div>
  </div>
</div>


      {/* Compliments Section */}
      <div className={`${styles.complimentsSection}`}>
        <h3>Compliments</h3>
        <div className={styles.complimentsTags}>
          <span>
            <IconCircleCheck size={16} color="#6c63ff" /> {user.compliments.itemAsDescribed} Item as described
          </span>
          <span>
            <IconHeart size={16} color="#6c63ff" /> {user.compliments.onTime} On time
          </span>
          <span>
            <IconCircleCheck size={16} color="#6c63ff" /> {user.compliments.communicative} Communicative
          </span>
        </div>
      </div>

      {/* Recent Postings Section */}
      <div className={`${styles.postingsSection}`}>
        <div className={styles.postingsHeader}>
          <h3>Recent Postings</h3>
          <select>
            <option>Sort by: Recent first</option>
            <option>Sort by: Price</option>
          </select>
        </div>
        <div className={styles.postingsGrid}>
          {user.listings.map((listing) => (
            <div key={listing.id} className={`${styles.postingCard}`}>
              <img src={listing.image} alt={listing.name} className={styles.postingImage} />
              <h4>{listing.name}</h4>
              <p>{listing.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
