import React from 'react'
import style from './about.module.css'
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

import celestin from '../../../assets/images/profile-photos/celestin.jpeg'
import jacobKlymenko from '../../../assets/images/profile-photos/jacobKylmenko.jpeg'
import nickJordan from '../../../assets/images/profile-photos/nickJordan.jpeg'
import primoBambao from '../../../assets/images/profile-photos/primoBambao.jpeg'
import prestonSia from '../../../assets/images/profile-photos/prestonSia.jpeg'
import fernandoOlivarNeri from '../../../assets/images/profile-photos/fernandoOlivarNeri.jpeg'
import alexYu from '../../../assets/images/profile-photos/alexYu.jpg'
import johnDiego from '../../../assets/images/profile-photos/johnDiego.jpeg'
import austinNguyen from '../../../assets/images/profile-photos/austinnguyen.jpg'
import orange from '../../../assets/images/profile-photos/Orange.png'
import aboutHeader from '../../../assets/images/about-photos/AboutHeader.png'
import about1 from '../../../assets/images/about-photos/About1.jpg'





const clubMembers = [
    {
        name: 'Celestin Ryf',
        img: celestin,
        title: 'President',
        socials: {
            email: 'celestinryf@gmail.com',
            linkedin: 'https://linkedin.com/in/celestin-ryf',
            github: 'https://github.com/celestinryf'
        }
    },
    {
        name: 'Nick Jordan',
        img: nickJordan,
        title: 'Full-stack Lead',
        socials: {
            email: 'njordan1@uw.edu',
            linkedin: 'http://linkedin.com/in/nicholas-jordan-a979a32a9',
            github: 'https://github.com/NickJordan-BE'
        }
    },
    {
        name: 'Jacob Klymenko',
        img: jacobKlymenko,
        title: 'Back-end Lead',
        socials: {
            email: 'jacobkly@uw.edu',
            linkedin: 'https://www.linkedin.com/in/jacob-kly/',
            github: 'https://github.com/jacobkly'
        }
    },
    {
        name: 'Preston Sia',
        img: prestonSia,
        title: 'Front-end Lead',
        socials: {
            email: 'psia97@uw.edu',
            linkedin: 'https://www.linkedin.com/in/preston-sia-10a542304',
            github: 'https://github.com/presia27/'
        }
    },
    {
        name: 'Primitivo Bambao',
        img: primoBambao,
        title: 'Design Lead',
        socials: {
            email: 'lumikhaiv@gmail.com',
            linkedin: 'https://www.linkedin.com/in/primitivo-bambao/',
            github: 'https://github.com/abstrcted'
        }
    },
    {
        name: 'Anthony Nadyuk',
        img: orange,
        title: 'Mobile Lead',
        socials: {
            email: '',
            linkedin: 'https://www.linkedin.com/in/anthony-n-0625702a5/',
            github: 'https://github.com/antnay'
        }
    },
    {
        name: 'Fernando Olivar Neri',
        img: fernandoOlivarNeri,
        title: 'Front-end Developer',
        socials: {
            email: '',
            linkedin: 'https://www.linkedin.com/in/foneri/',
            github: 'https://github.com/Feekly'
        }
    },
    {
        name: 'Austin Nguyen',
        img: austinNguyen,
        title: 'Front-end Developer',
        socials: {
            email: 'austin11@uw.edu',
            linkedin: 'https://www.linkedin.com/in/astn-ngyn/',
            github: 'https://github.com/ASTN-NGYN'
        }
    },
    {
        name: 'Alex Yu',
        img: alexYu,
        title: 'Front-end Developer',
        socials: {
            email: '',
            linkedin: 'https://www.linkedin.com/in/alex-yu-2a419127b/',
            github: 'https://github.com/AlexY305'
        }
    },
    {
        name: 'John Diego',
        img: johnDiego,
        title: 'Front-end Developer',
        socials: {
            email: '',
            linkedin: '',
            github: 'https://github.com/diego-menudo'
        }
    },
    {
        name: 'Linda',
        img: orange,
        title: 'Back-end Developer',
        socials: {
            email: '',
            linkedin: '',
            github: 'https://github.com/Linda-Miao'
        }
    },
    {
        name: 'James Escudero',
        img: orange,
        title: 'Back-end Developer',
    },
    {
        name: 'Renzoserg Aquino',
        img: orange,
        title: 'Back-end Developer',
        socials: {
            email: 'aquinren@uw.edu',
            linkedin: 'https://www.linkedin.com/in/renzoserg-aquino-782744340/',
            github: 'https://github.com/uwRenRen'
        }
    },
    {
        name: 'Matthew',
        img: orange,
        title: 'Mobile Developer',
        socials: {
            email: '',
            linkedin: '',
            github: ''
        }
    }
]


function about() {
  return (
    <div className={style.pageContainer}>
        <div className={style.heroBanner} style={{ backgroundImage: `url(${aboutHeader})` }}>
            <h1>ABOUT US</h1>
        </div>

        <div className={style.clubDescriptionWrapper}>
            <h1>
                Empowering students to build, collaborate, 
                and innovate with real-world tech solutions.
            </h1>
            <div className={style.clubDesciptionContent}>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, voluptates dolorum magnam cum vitae placeat eligendi commodi quam. 
                    Unde voluptate, ipsa tempore sunt explicabo perferendis in dolor numquam culpa aperiam excepturi voluptates, hic, illo vero facere enim maxime. 
                    Illo animi, esse, repudiandae nulla autem voluptatibus deleniti dolor molestiae, non nemo voluptatum eaque maiores! 
                    Officiis neque nesciunt illum voluptas, molestias quaerat quasi provident quia repellat! Hic repudiandae eos tenetur, temporibus velit qui aut 
                    tempora laborum! Harum dolor ut est molestias natus placeat esse adipisci consectetur quam magnam modi, similique maxime vitae inventore accusamus 
                    temporibus a ipsum possimus commodi tempore quisquam repellendus.
                </p>
            </div>
        </div>
        <div className={style.teamWrapper}>
            <div className={style.teamLeftDiv}>
                <h2>Our team</h2>
                <p>
                    Meet the leaders of Tech Startup Club who are driving innovation, collaboration, and the future of student-driven technology.
                </p>
            </div>
            <div className={style.teamRightDiv}>
                <img src={about1} alt="Team" />
            </div>
        </div>

        <div className={style.cardContainer}>
            {clubMembers.map((member, index) => (
                <div key={index} className={style.card}>
                <img src={member.img} alt={member.name} className={style.profileImage} />
                <h3>{member.name}</h3>
                <p>{member.title}</p>
                <div className={style.socials}>
                    {member.socials?.email && (
                        <a href={`mailto:${member.socials.email}`} target="_blank" rel="noopener noreferrer">   
                            <span className={style.socialIcon}>
                                <MdEmail />
                            </span>
                        </a>
                    )}
                    {member.socials?.linkedin && (
                        <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer">
                            <span className={style.socialIcon}>
                                <FaLinkedin />
                            </span>
                        </a>
                    )}
                    {member.socials?.github && (
                        <a href={member.socials.github} target="_blank" rel="noopener noreferrer">
                           <span className={style.socialIcon}>
                                <FaGithub />
                            </span>
                        </a>
                    )}
                </div>
            </div>
            ))}
        </div>
    </div>
  )
}

export default about